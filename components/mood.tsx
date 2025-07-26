'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Smile } from 'lucide-react';

type SquarePromptProps = {
  emojiSet?: Record<string, string[]>;
  initialAct?: string;
  size?: number;
  imgPath?: string;
};

const DEFAULT_EMOJI_SET = {
  rigol: ["026", "026", "027~", "028~", "029~", "030~", "031", "032", "033", "031", "032", "033~"],
  impressed: ["004", "005", "006", "007", "008", "009"],
  angry: ["010", "011", "012", "013", "014", "013~", "012~"],
  neutral: ["021", "021~", "022#", "022#", "022#", "022#", "021", "021", "023#", "023#", "023#", "023#", "021", "025", "025", "024~", "025", "025", "024~"],
  sad: ["034~", "034~", "034~", "034~", "034~", "034~", "035~", "035~", "035~", "035~", "035~", "035~", "035~"]
};

export function SquarePrompt({
  emojiSet = DEFAULT_EMOJI_SET,
  initialAct = '',
  size = 400,
  imgPath = './',
}: SquarePromptProps) {
  const [act, setAct] = useState(initialAct);
  const [actIndex, setActIndex] = useState(0);
  const [actSens, setActSens] = useState(1);
  const [selected, setSelected] = useState(!!initialAct);
  const router = useRouter();
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setActIndex(0);
  }, [act]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentEmoji = emojiSet[act]?.[actIndex];
      if (!currentEmoji) return;

      const noTilde = currentEmoji.indexOf('~', 3) === -1;
      const noSharp = currentEmoji.indexOf('#', 3) === -1;

      if ((noTilde && actSens < 0) || (noSharp && actSens > 0)) {
        if (imgRef.current) {
          imgRef.current.src = `${imgPath}img${currentEmoji.slice(0, 3)}.svg`;
        }
      } else {
        let newIndex = actIndex;
        while (
          emojiSet[act][newIndex]?.indexOf('~', 3) === 3 ||
          emojiSet[act][newIndex]?.indexOf('#', 3) === 3
        ) {
          newIndex += actSens;
          if (newIndex < 0 || newIndex >= emojiSet[act].length) break;
        }
        setActIndex(newIndex);
      }

      let nextIndex = actIndex + actSens;
      if (nextIndex >= emojiSet[act].length) {
        nextIndex = emojiSet[act].length - 1;
        setActSens(-1);
      } else if (nextIndex < 0) {
        nextIndex = 0;
        setActSens(1);
      }
      setActIndex(nextIndex);
    }, 150);

    return () => clearInterval(interval);
  }, [act, actIndex, actSens, emojiSet, imgPath]);

  const handleSend = () => {
    if (act) {
      router.push(`/form?mood=${encodeURIComponent(act)}`);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAct(e.target.value);
    setSelected(true);
  };

  return (
    <div
      className="rounded-2xl border border-yellow-800 bg-[#FDF6ED] shadow-lg p-6 flex flex-col justify-between transition-all"
      style={{ width: size, height: size + 60, minWidth: 350, minHeight: 420 }}
    >
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-xl font-bold text-yellow-900">Choisis ton humeur</h2>
        <img
          ref={imgRef}
          src={act ? `${imgPath}img${emojiSet[act]?.[actIndex]?.slice(0, 3)}.svg` : ''}
          alt="Emoji animé"
          className="w-44 h-44 rounded-full bg-[#EEE3D0] border border-yellow-800 shadow-inner transition-all"
        />

        <select
          value={act}
          onChange={handleSelectChange}
          className="mt-4 w-full border border-yellow-800 bg-[#FFF9F0] text-yellow-900 rounded-xl p-3 text-base shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-yellow-700 hover:border-yellow-600"
        >
          <option value="" disabled>-- Sélectionne une humeur --</option>
          {Object.keys(emojiSet).map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <button
          onClick={handleSend}
          disabled={!act}
          className={`mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold tracking-wide transition-all focus:outline-none focus:ring-2 focus:ring-offset-2
            ${
              act
                ? 'bg-yellow-800 text-white hover:bg-yellow-700 focus:ring-yellow-800'
                : 'bg-[#E5D8C5] text-gray-400 cursor-not-allowed'
            }`}
        >
          <Smile className="w-5 h-5" />
          Envoyer mon humeur
        </button>
      </div>
    </div>
  );
}
