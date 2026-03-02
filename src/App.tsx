import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { MapPin, Key, Percent, ChevronDown, Send } from 'lucide-react';

export default function App() {
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center transition-all duration-500 ${
          scrolled
            ? 'bg-black/80 backdrop-blur-md shadow-md py-3'
            : 'bg-black/30 backdrop-blur-sm'
        }`}
      >
        <div className="text-xl font-serif tracking-widest uppercase text-white drop-shadow-md">June Lab</div>
        <div className="hidden md:flex space-x-8 text-xs uppercase tracking-widest font-normal">
          <a href="#hero" className="text-white hover:text-june-pink transition-colors drop-shadow-md">Accueil</a>
          <a href="#promesse" className="text-white hover:text-june-pink transition-colors drop-shadow-md">Notre Vision</a>
          <a href="#contact" className="text-white hover:text-june-pink transition-colors drop-shadow-md">Contact</a>
        </div>
      </nav>

      {/* Section 1: HERO */}
      <section id="hero" ref={addToRefs} className="relative h-screen overflow-hidden flex items-center justify-center">
        <motion.div
          style={{ y: y1 }}
          className="absolute inset-0 z-0"
        >
          <div
            className="w-full h-[120%] bg-cover bg-center grayscale-[20%] brightness-[0.7]"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop")' }}
          />
        </motion.div>
        <div className="relative z-10 text-center text-white px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-serif mb-6 leading-tight"
          >
            Votre futur <br />
            <em>commence ici</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg md:text-xl font-light mb-10 tracking-wide"
          >
            Une architecture d'exception au cœur d'un écrin de verdure.
          </motion.p>
          <motion.a
            href="#promesse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="inline-block border border-white text-white px-8 py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
          >
            Découvrir le programme
          </motion.a>
        </div>
        <div className="absolute bottom-8 z-10 text-white animate-bounce">
          <ChevronDown size={24} />
        </div>
      </section>

      {/* Section 2: PROMESSE */}
      <section id="promesse" ref={addToRefs} className="py-24 px-6 bg-stone-50">
        <div
          className={`max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center transition-all duration-700 ${
            isVisible['promesse'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-june-teal/10 flex items-center justify-center">
              <MapPin className="text-june-teal" size={24} />
            </div>
            <h3 className="text-june-teal text-lg font-light tracking-wide">À 8 min de Paris</h3>
            <p className="text-stone-500 text-sm font-light leading-relaxed">Une localisation stratégique alliant calme résidentiel et proximité urbaine.</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-june-teal/10 flex items-center justify-center">
              <Key className="text-june-teal" size={24} />
            </div>
            <h3 className="text-june-teal text-lg font-light tracking-wide">Frais de notaire offerts</h3>
            <p className="text-stone-500 text-sm font-light leading-relaxed">Profitez d'un avantage financier exclusif pour votre première acquisition.</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-june-teal/10 flex items-center justify-center">
              <Percent className="text-june-teal" size={24} />
            </div>
            <h3 className="text-june-teal text-lg font-light tracking-wide">TVA réduite</h3>
            <p className="text-stone-500 text-sm font-light leading-relaxed">Éligibilité au dispositif de TVA à 5,5% sous conditions de ressources.</p>
          </div>
        </div>
      </section>

      {/* Section 3: FORMULAIRE */}
      <section id="contact" ref={addToRefs} className="py-24 px-6 bg-stone-100">
        <div
          className={`max-w-2xl mx-auto transition-all duration-700 ${
            isVisible['contact'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-white p-10 shadow-sm">
            <h2 className="text-3xl font-serif text-june-teal text-center mb-2">Recevoir la brochure</h2>
            <p className="text-center text-stone-400 text-sm font-light mb-10 italic">Laissez-nous vos coordonnées pour être recontacté par un conseiller.</p>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="text-xs uppercase tracking-widest text-stone-400">Nom</label>
                <input type="text" name="nom" required className="w-full bg-transparent border-b border-june-teal/20 py-2 focus:border-june-teal outline-none transition-colors font-light" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-stone-400">Prénom</label>
                <input type="text" name="prenom" required className="w-full bg-transparent border-b border-june-teal/20 py-2 focus:border-june-teal outline-none transition-colors font-light" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-stone-400">Email</label>
                <input type="email" name="email" required className="w-full bg-transparent border-b border-june-teal/20 py-2 focus:border-june-teal outline-none transition-colors font-light" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-stone-400">Téléphone</label>
                <input type="tel" name="telephone" required className="w-full bg-transparent border-b border-june-teal/20 py-2 focus:border-june-teal outline-none transition-colors font-light" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-stone-400">Ville de résidence</label>
                <input type="text" name="ville" className="w-full bg-transparent border-b border-june-teal/20 py-2 focus:border-june-teal outline-none transition-colors font-light" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-stone-400">Typologie recherchée</label>
                <select name="typologie" className="w-full bg-transparent border-b border-june-teal/20 py-2 focus:border-june-teal outline-none transition-colors font-light appearance-none cursor-pointer">
                  <option value="studio">Studio</option>
                  <option value="2p">2 Pièces</option>
                  <option value="3p">3 Pièces</option>
                  <option value="4p">4 Pièces</option>
                  <option value="5p">5 Pièces +</option>
                </select>
              </div>
              <div className="md:col-span-2 flex items-start gap-3 text-xs text-stone-400 font-light">
                <input type="checkbox" id="rgpd" name="rgpd" required className="mt-1 accent-june-teal" />
                <label htmlFor="rgpd">J'accepte que mes données soient traitées par June Lab dans le cadre de ma recherche immobilière conformément à la politique de confidentialité.</label>
              </div>
              <div className="md:col-span-2 text-center">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 border border-june-teal text-june-teal px-10 py-3 text-xs uppercase tracking-widest hover:bg-june-teal hover:text-white transition-all duration-300"
                >
                  <Send size={14} /> Je m'inscris
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-stone-400 py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs uppercase tracking-widest">
          <div className="font-serif text-white text-base">June Lab</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
            <a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
          <div>&copy; {new Date().getFullYear()} June Lab. Tous droits réservés.</div>
        </div>
      </footer>
    </div>
  );
}
