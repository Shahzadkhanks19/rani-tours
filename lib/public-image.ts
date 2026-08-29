const RASTER_IMAGE_RE=/\.(?:jpe?g|png|webp)$/i;
const FORTUNER_COMMONS_FILE="2025 Toyota Fortuner 2.8 Q 4x2 in Platinum White Pearl Mica, front right.jpg";
const FORTUNER_THUMB_BASE="https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/2025_Toyota_Fortuner_2.8_Q_4x2_in_Platinum_White_Pearl_Mica,_front_right.jpg";

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

    if(url.hostname==="commons.wikimedia.org"&&decodeURIComponent(url.pathname).includes(FORTUNER_COMMONS_FILE)){
      const encodedName=encodeURIComponent(FORTUNER_COMMONS_FILE.replaceAll(" ","_")).replaceAll("%2C",",");
      return bridgeWikimedia(new URL(`${FORTUNER_THUMB_BASE}/${safeWidth}px-${encodedName}`));
    }

    if((url.hostname==="commons.wikimedia.org"||url.hostname.endsWith(".wikimedia.org"))&&url.pathname.includes("Special:Redirect/file/")){
      url.searchParams.set("width",String(safeWidth));
      return bridgeWikimedia(url);
    }

    if(url.hostname==="upload.wikimedia.org"&&url.pathname.includes("/wikipedia/commons/")){
      const parts=url.pathname.split("/").filter(Boolean);
      const commonsIndex=parts.indexOf("commons");
      if(commonsIndex>=0){
        const thumbIndex=parts.indexOf("thumb",commonsIndex+1);
        if(thumbIndex>=0&&parts.length>=thumbIndex+5){
          const filename=parts[parts.length-2];
          if(RASTER_IMAGE_RE.test(decodeURIComponent(filename))){
            parts[parts.length-1]=`${safeWidth}px-${filename}`;
            url.pathname=`/${parts.join("/")}`;
            url.search="";
            return bridgeWikimedia(url);
          }
        }
        const filename=parts[parts.length-1];
        if(RASTER_IMAGE_RE.test(decodeURIComponent(filename))&&parts.length>=commonsIndex+4){
          const prefix=parts.slice(0,commonsIndex+1);
          const fileParts=parts.slice(commonsIndex+1);
          url.pathname=`/${[...prefix,"thumb",...fileParts,`${safeWidth}px-${filename}`].join("/")}`;
          url.search="";
          return bridgeWikimedia(url);
        }
      }
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
