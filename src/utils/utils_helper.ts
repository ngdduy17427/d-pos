export function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c: string): string =>
    (Number(c) ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(c) / 4)))).toString(
      16
    )
  );
}

export function formatCurrency(
  number: number | bigint,
  locales = "vi-VN",
  options: Intl.NumberFormatOptions = { style: "currency", currency: "VND" }
): string {
  return new Intl.NumberFormat(locales, options).format(number);
}

export function addClassToElement(elementId: string, ...classNames: string[]): void {
  document.getElementById(elementId)?.classList.add(...classNames);
}

export function removeClassFromElement(elementId: string, ...classNames: string[]): void {
  document.getElementById(elementId)?.classList.remove(...classNames);
}

export async function handleAddProductCartAnimation(
  imgSrc: string,
  imgRef: React.RefObject<HTMLImageElement>
): Promise<HTMLImageElement> {
  const imgElement = document.createElement("img");
  imgElement.src = imgSrc;
  imgElement.style.width = `${(<HTMLImageElement>imgRef?.current).getBoundingClientRect().width}px`;
  imgElement.style.height = `${(<HTMLImageElement>imgRef?.current).getBoundingClientRect().height}px`;
  imgElement.className = "!absolute";
  imgElement.style.top = `${window.scrollY + Number((<HTMLImageElement>imgRef?.current).getBoundingClientRect().top)}px`;
  imgElement.style.left = `${(<HTMLImageElement>imgRef?.current).getBoundingClientRect().left}px`;
  imgElement.style.transition = `all 0.5s`;
  imgElement.style.pointerEvents = `none`;
  imgElement.style.zIndex = `10000`;
  document.getElementsByTagName("main")[0].appendChild(imgElement);

  setTimeout((): void => {
    const itemsInCartBtn = document.getElementById("itemsInCartBtn");
    const itemsInCartTop =
      window.scrollY +
      Number(itemsInCartBtn?.getBoundingClientRect().top) +
      Number(itemsInCartBtn?.getBoundingClientRect().height) / 2 -
      10;
    const itemsInCartLeft =
      Number(itemsInCartBtn?.getBoundingClientRect().left) +
      Number(itemsInCartBtn?.getBoundingClientRect().width) / 2 -
      10;

    imgElement.style.width = `20px`;
    imgElement.style.height = `20px`;
    imgElement.style.top = `${itemsInCartTop}px`;
    imgElement.style.left = `${itemsInCartLeft}px`;
  }, 50);

  return new Promise(
    (resolve): NodeJS.Timeout =>
      setTimeout(
        (): void => resolve(document.getElementsByTagName("main")[0].removeChild(imgElement)),
        600
      )
  );
}
