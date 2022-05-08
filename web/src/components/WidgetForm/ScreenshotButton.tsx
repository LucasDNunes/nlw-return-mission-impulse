import {Camera, Trash} from "phosphor-react";
import html2canvas from "html2canvas";
import {useState} from "react";
import {Loading} from "../Loading";

interface ScreenshotButtonProps {
  onScreenshotTook: (screenshot: string | null) => void;
  screenshot: string | null;
}

export function ScreenshotButton(props: ScreenshotButtonProps) {

  const [isTakingScreenshot, setIsTakingScreenshot] =useState(false);

  async function handleTakeScreenshot() {
    setIsTakingScreenshot(true);
    const canvas = await html2canvas(document.querySelector('html')!);
    const base64image = canvas.toDataURL('image/png');

    props.onScreenshotTook(base64image);
    setIsTakingScreenshot(false);

  }

  if (props.screenshot) {
    return (
      <button
        type="button"
        onClick={() => props.onScreenshotTook(null)}
        className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
        style={{ //uma chava para indicar que é cod JS e a outra para indicar que é um OBJ JS
          backgroundImage: `url(${props.screenshot})`,

          // esses estilos é apenas pois o site é preto e nisso ele só vai mostrar no preview da print o canto da tela aonde está o wigdet
          backgroundPosition: 'right bottom',
          backgroundSize: 180
        }}
      >
        <Trash weight="fill" />
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleTakeScreenshot}
      className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
    >
      { isTakingScreenshot ? <Loading /> : <Camera className="w-6 h6" /> }
    </button>
  );
}