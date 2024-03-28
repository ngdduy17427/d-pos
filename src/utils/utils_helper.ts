export function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c: any) =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  );
}

export function formatCurrency(
  number: number | bigint,
  locales = "vi-VN",
  options: Intl.NumberFormatOptions = { style: "currency", currency: "VND" }
) {
  return new Intl.NumberFormat(locales, options).format(number);
}

export function addClassToElement(elementId: string, ...classNames: string[]) {
  document.getElementById(elementId)?.classList.add(...classNames);
}

export function removeClassFromElement(elementId: string, ...classNames: string[]) {
  document.getElementById(elementId)?.classList.remove(...classNames);
}

export async function handleAddProductCartAnimation(
  imgSrc: string,
  imgRef: React.RefObject<HTMLImageElement>
) {
  const imgElement = document.createElement("img");
  imgElement.src = imgSrc;
  imgElement.style.width = `${(imgRef?.current as HTMLImageElement).getBoundingClientRect().width}px`;
  imgElement.style.height = `${(imgRef?.current as HTMLImageElement).getBoundingClientRect().height}px`;
  imgElement.className = "!absolute";
  imgElement.style.top = `${window.scrollY + ((imgRef?.current as HTMLImageElement).getBoundingClientRect().top as number)}px`;
  imgElement.style.left = `${(imgRef?.current as HTMLImageElement).getBoundingClientRect().left}px`;
  imgElement.style.transition = `all 0.5s`;
  imgElement.style.pointerEvents = `none`;
  imgElement.style.zIndex = `10000`;
  document.getElementsByTagName("main")[0].appendChild(imgElement);

  setTimeout(() => {
    const itemsInCartBtn = document.getElementById("itemsInCartBtn");
    const itemsInCartTop =
      window.scrollY +
      (itemsInCartBtn?.getBoundingClientRect().top as number) +
      (itemsInCartBtn?.getBoundingClientRect().height as number) / 2 -
      10;
    const itemsInCartLeft =
      (itemsInCartBtn?.getBoundingClientRect().left as number) +
      (itemsInCartBtn?.getBoundingClientRect().width as number) / 2 -
      10;

    imgElement.style.width = `20px`;
    imgElement.style.height = `20px`;
    imgElement.style.top = `${itemsInCartTop}px`;
    imgElement.style.left = `${itemsInCartLeft}px`;
  }, 50);

  return new Promise((resolve) =>
    setTimeout(() => resolve(document.getElementsByTagName("main")[0].removeChild(imgElement)), 600)
  );
}
