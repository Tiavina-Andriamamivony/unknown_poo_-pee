'use client';
import { useState } from 'react';

export default function CacaAnalyse() {
  const [smell, setSmell] = useState('');
  const [consistency, setConsistency] = useState('');
  const [color, setColor] = useState('');
  const [mood, setMood] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const getFunnyAnalysis = () => {
    if (!smell || !consistency || !color || !mood) return null;

    const lines: string[] = [];

    // Odeur
    if (smell === 'aucune') lines.push('— Tu es peut-être une fleur 🌸');
    else if (smell === 'moyen') lines.push('— Tout à fait normal 💨');
    else lines.push('— Tu vis dangereusement ☣️');

    // Consistance
    if (consistency === 'liquide') lines.push('— Tu bois trop de café ? ☕');
    else if (consistency === 'normal') lines.push('— Parfait équilibre 🍌');
    else lines.push('— Tu pourrais construire un mur 🧱');

    // Couleur
    if (color === 'marron') lines.push('— Classic 💩');
    else if (color === 'vert') lines.push('— Tu manges trop d’épinards ? 🥬');
    else if (color === 'noir') lines.push('— Consulte un médecin ! 🏥');
    else lines.push('— Wow... tu brilles dans le noir ? 🌈');

    // Humeur
    switch (mood) {
      case 'rigol':
        lines.push('Ton 💩 a probablement raconté une blague avant de sortir 😂');
        break;
      case 'sad':
        lines.push('Caca mélancolique... une larme a sûrement coulé 😢');
        break;
      case 'angry':
        lines.push('Ce 💩 est sorti avec rage. Il veut en découdre 💢');
        break;
      case 'impressed':
        lines.push("Même ton 💩 est impressionnant aujourd'hui ✨");
        break;
      case 'neutral':
        lines.push('Un 💩 très professionnel. Sans émotion. 👔');
        break;
      default:
        lines.push('Humeur inconnue... probablement en mode caca ninja 🥷');
    }

    return (
      <ul className="list-disc pl-5 space-y-1 text-lg mt-4">
        {lines.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className="min-h-screen bg-orange-100 text-brown-900 flex items-center justify-center p-6">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-3xl font-extrabold text-orange-700 text-center">
            Analyse ton 💩
          </h2>

          {/* Humeur */}
          <div>
            <label className="block font-semibold text-orange-800 mb-2">
              Ton humeur
            </label>
            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="w-full rounded-xl border border-orange-400 p-3 text-orange-700 font-semibold"
              required
            >
              <option value="">-- Choisis ton humeur --</option>
              <option value="rigol">Rigolote</option>
              <option value="sad">Triste</option>
              <option value="angry">En colère</option>
              <option value="impressed">Impressionné(e)</option>
              <option value="neutral">Neutre</option>
            </select>
          </div>

          {/* Odeur */}
          <div>
            <label className="block font-semibold text-orange-800 mb-2">
              Odeur
            </label>
            <select
              value={smell}
              onChange={(e) => setSmell(e.target.value)}
              className="w-full rounded-xl border border-orange-400 p-3 text-orange-700 font-semibold"
              required
            >
              <option value="">-- Choisis une odeur --</option>
              <option value="aucune">Aucune</option>
              <option value="moyen">Moyenne</option>
              <option value="forte">Forte</option>
            </select>
          </div>

          {/* Consistance */}
          <div>
            <label className="block font-semibold text-orange-800 mb-2">
              Consistance
            </label>
            <select
              value={consistency}
              onChange={(e) => setConsistency(e.target.value)}
              className="w-full rounded-xl border border-orange-400 p-3 text-orange-700 font-semibold"
              required
            >
              <option value="">-- Choisis une consistance --</option>
              <option value="liquide">Liquide</option>
              <option value="normal">Normale</option>
              <option value="dure">Dure</option>
            </select>
          </div>

          {/* Couleur */}
          <div>
            <label className="block font-semibold text-orange-800 mb-2">
              Couleur
            </label>
            <select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full rounded-xl border border-orange-400 p-3 text-orange-700 font-semibold"
              required
            >
              <option value="">-- Choisis une couleur --</option>
              <option value="marron">Marron</option>
              <option value="vert">Vert</option>
              <option value="noir">Noir</option>
              <option value="autre">Autre</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-orange-600 text-white font-bold hover:bg-orange-700 transition"
          >
            Analyser mon 💩
          </button>
        </form>

        {submitted && (
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-2 text-orange-800">
              Voici ton analyse 💩 :
            </h3>
            {getFunnyAnalysis()}
          </div>
        )}
      </div>
    </div>
  );
}
