function bridgeWikimedia(url:URL){
  return `/api/image?url=${encodeURIComponent(url.toString())}`;
}

export function isBridgedPublicImage(src:string){
  return src.startsWith("/api/image?url=");
}

export function publicImageUrl(src:string,width:number){
  if(!src||src.startsWith("/")||src.startsWith("data:"))return src;
  try{
    const url=new URL(src);
    const safeWidth=Math.max(160,Math.min(2000,Math.round(width)));

    // Let Wikimedia resolve its own canonical file/thumb URLs. Rebuilding
    // /thumb/ paths locally is fragile for encoded punctuation and non-ASCII
    // filenames and was the cause of the remaining 404/502 responses.
    if(url.hostname==="commons.wikimedia.org"&&url.pathname.includes("/wiki/Special:Redirect/file/")){
      url.searchParams.set("width",String(safeWidth));
      return bridgeWikimedia(url);
    }

    if(url.hostname==="upload.wikimedia.org"&&url.pathname.includes("/wikipedia/commons/")){
      return bridgeWikimedia(url);
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
