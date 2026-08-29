function bridgeWikimedia(url:URL){
  return `/api/image?url=${encodeURIComponent(url.toString())}`;
}

export function isBridgedPublicImage(src:string){
  return src.startsWith("/api/image?url=");
}

function wikimediaRedirectUrl(source:URL,width:number){
  const parts=source.pathname.split("/").filter(Boolean);
  const thumbIndex=parts.indexOf("thumb");
  let filename="";

  if(thumbIndex>=0&&parts.length>thumbIndex+3){
    // Wikimedia thumbnail paths end with /<filename>/<width>-<filename>.
    filename=parts[parts.length-2]||"";
  }else{
    filename=parts[parts.length-1]||"";
  }

  if(!filename)return source;

  const redirect=new URL("https://commons.wikimedia.org/wiki/Special:Redirect/file/");
  redirect.pathname+=filename;
  redirect.searchParams.set("width",String(width));
  return redirect;
}

export function publicImageUrl(src:string,width:number){
  if(!src||src.startsWith("/")||src.startsWith("data:"))return src;
  try{
    const url=new URL(src);
    const safeWidth=Math.max(160,Math.min(2000,Math.round(width)));

    // Ask Wikimedia itself for a resized derivative. This keeps filenames and
    // encoding canonical while avoiding multi-megabyte originals in the browser.
    if(url.hostname==="commons.wikimedia.org"&&url.pathname.includes("/wiki/Special:Redirect/file/")){
      url.searchParams.set("width",String(safeWidth));
      return bridgeWikimedia(url);
    }

    if(url.hostname==="upload.wikimedia.org"&&url.pathname.includes("/wikipedia/commons/")){
      return bridgeWikimedia(wikimediaRedirectUrl(url,safeWidth));
    }

    if(url.hostname.endsWith(".wikimedia.org")){
      return bridgeWikimedia(url);
    }

    if(url.hostname==="images.pexels.com"){
      url.searchParams.set("auto","compress");
      url.searchParams.set("cs","tinysrgb");
      url.searchParams.set("w",String(safeWidth));
      return url.toString();
    }

    if(url.hostname==="images.unsplash.com"){
      url.searchParams.set("auto","format");
      url.searchParams.set("fit","crop");
      url.searchParams.set("q","62");
      url.searchParams.set("w",String(safeWidth));
      return url.toString();
    }

    if(url.searchParams.has("imwidth")){
      url.searchParams.set("imwidth",String(safeWidth));
      return url.toString();
    }

    return src;
  }catch{return src;}
}
