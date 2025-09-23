import React from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { translationsEs, translationsEn } from '../translations';
import FlipCard from './FlipCard';
const BASE = import.meta.env.BASE_URL || '/';
import { IconYouTube as FooterIconYouTube, IconFacebook, IconInstagram, IconTikTok, IconLinkedIn } from './Footer';
import BlogList from './blog/BlogList';
interface Props { activeSection: string; setActiveSection: (s: string) => void; }

// Inline SVG icons for music platforms
const IconAppleMusic: React.FC = () => (
  <svg width="28" height="28" viewBox="0 0 48 48" aria-label="Apple Music" role="img">
    <circle cx="24" cy="24" r="22" fill="#fa57c1"/>
    <path d="M21 14v15.2c0 2-1.8 3.6-3.9 3.6S13 31.2 13 29.2s1.8-3.6 4.1-3.6c1 0 1.9.3 2.6.9V18l12-3v12.2c0 2-1.8 3.6-3.9 3.6s-4.1-1.6-4.1-3.6 1.8-3.6 4.1-3.6c1 0 1.9.3 2.6.9V13.2L21 16.2V14z" fill="#fff"/>
  </svg>
)

const IconSpotify: React.FC = () => (
  <svg width="28" height="28" viewBox="0 0 48 48" aria-label="Spotify" role="img">
    <circle cx="24" cy="24" r="22" fill="#1DB954"/>
    <path d="M12 30c7-3 17-2.5 22 0" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none"/>
    <path d="M12 24c7-2.5 16-2 21 0.5" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none" opacity=".8"/>
    <path d="M12 18c6-2 13-1.7 19 0.5" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none" opacity=".6"/>
  </svg>
)

const IconYouTubeMusic: React.FC = () => (
  <svg width="28" height="28" viewBox="0 0 48 48" aria-label="YouTube Music" role="img">
    <circle cx="24" cy="24" r="22" fill="#FF0033"/>
    <circle cx="24" cy="24" r="8" fill="#fff" opacity=".2"/>
    <polygon points="22,19 22,29 30,24" fill="#fff"/>
  </svg>
)

const IconYouTube: React.FC = () => (
  <svg width="28" height="28" viewBox="0 0 48 48" aria-label="YouTube" role="img">
    <rect x="6" y="12" rx="6" ry="6" width="36" height="24" fill="#FF0000"/>
    <polygon points="22,19 22,29 30,24" fill="#fff"/>
  </svg>
)

const IconSoundCloud: React.FC = () => (
  <svg width="28" height="28" viewBox="0 0 48 48" aria-label="SoundCloud" role="img">
    <rect width="48" height="48" fill="transparent"/>
    <path d="M30 20a8 8 0 0 0-8-8c-3.7 0-6.9 2.6-7.7 6.1C10.7 19.1 8 22 8 25.7 8 29.6 11.1 33 15 33h19c3.3 0 6-2.7 6-6s-2.7-6-6-6h-4z" fill="#ff7700"/>
    <rect x="12" y="22" width="2" height="11" fill="#ff7700"/>
    <rect x="15" y="21" width="2" height="12" fill="#ff7700"/>
    <rect x="18" y="20" width="2" height="13" fill="#ff7700"/>
  </svg>
)

// Subcomponent to render Explore section (keeps hooks local and rule-compliant)
const ExploreSection: React.FC<{ language: 'es' | 'en'; t: any }> = ({ language, t }) => {
  return (
    <div className="fade-in">
      <div className="hero-bar"><div className="container"><h1 className="hero-title">{t.explore}</h1></div></div>
      <div className="container">
        <div className="intro-text"><p className="intro-rest">{t.exploreIntro}</p></div>
        <div className="cards-container">
          <FlipCard image={`${BASE}images/explora1.png`} title={t.exploreFlipBlogTitle} description={t.exploreFlipBlogDesc}
            links={[{label: language==='es'?'Listado de artículos':'Articles list', href:'#epu-blog', internal: true}]} />
          <FlipCard image={`${BASE}images/explora2.png`} title={t.exploreFlipBooksTitle} description={t.exploreFlipBooksDesc}
            links={[{label: language==='es'?'Listado de libros':'Books list', href:'#'},{label:'Libro 2', href:'#'},{label:'Libro 3', href:'#'}]} />
          <FlipCard image={`${BASE}images/explora3.png`} title={t.exploreFlipResourcesTitle} description={t.exploreFlipResourcesDesc}
            links={[{label: language==='es'?'Listado de recursos':'Resources list', href:'#'},{label:'Recurso 2', href:'#'},{label:'Recurso 3', href:'#'}]} />
        </div>
        <div id="epu-blog" className="image-container" style={{ marginTop: '40px' }}>
          <h2 className="section-title">{language === 'es' ? 'Artículos del Blog' : 'Blog Articles'}</h2>
          <div style={{ boxShadow: '0 8px 20px rgba(0,0,0,0.15)', borderRadius: 8, background: '#fff', padding: 20 }}>
            <BlogList />
          </div>
        </div>
        <div className="image-container" style={{ marginTop: '40px' }}>
          <iframe src={`${BASE}guide/index.html`} style={{ width: '100%', height: '1200px', border: 'none', borderRadius: '8px', boxShadow: '0 8px 20px rgba(0,0,0,0.15)' }} title="Guía Emocional Interactiva"></iframe>
        </div>
      </div>
    </div>
  );
};

// Subcomponent to render Connect section (with its own hooks)
const ConnectSection: React.FC<{ language: 'es' | 'en'; setActiveSection: (s: string) => void }> = ({ language, setActiveSection }) => {
  const isEs = language === 'es';
  const heading = isEs ? '✨ CONECTA' : '✨ CONNECT';
  const sub = isEs
    ? 'Todos tenemos una historia que cuenta nuestra forma de ver la vida y nos hace conectar con las personas que menos habríamos imaginado. Por eso te invito a conocer un poco sobre mi historia  y a conectar conmigo incluso en las diferencias, ya que muchas veces mas que alejarnos, nos acercan desde nuestra parte mas humana'
    : 'Beyond projects, stories bring us together.';

  const cards = [
    { id: 'musica', image: `${BASE}images/musica_conecta.png`, title: isEs ? 'Música' : 'Music', text: isEs ? 'La música no solo me acompaña, me define.' : 'Music doesn’t just accompany me — it defines me.', cta: isEs ? 'Descubre mi mundo musical' : 'Discover my music world' },
    { id: 'escritura', image: `${BASE}images/escritura_conecta.png`, title: isEs ? 'Escritura' : 'Writing', text: isEs ? 'Algunas historias necesitan ser contadas.' : 'Some stories simply need to be told.', cta: isEs ? 'Lee más sobre mi escritura' : 'Read more about my writing' },
    { id: 'migrar', image: `${BASE}images/migrar_conecta.png`, title: isEs ? 'Migrar & Reinventarse' : 'Migrate & Reinvent', text: isEs ? 'He vivido en tres países, cada uno me transformó.' : 'I’ve lived in three countries; each one transformed me.', cta: isEs ? 'Conoce mi historia migrante' : 'Know my migrant story' },
    { id: 'vocacional', image: `${BASE}images/vocacional_conecta.png`, title: isEs ? 'Vocación social' : 'Social vocation', text: isEs ? 'Trabajo para transformar vidas desde la justicia.' : 'I work to transform lives through justice.', cta: isEs ? 'Mi experiencia en justicia comunitaria' : 'My community justice experience' },
  ] as const;

  const [activeModule, setActiveModule] = React.useState<null | typeof cards[number]['id']>(null);
  const loc = useLocation();
  React.useEffect(() => {
    const m = (loc.hash || '').match(/^#connect:([a-zA-Z0-9_-]+)/);
    if (m && (['musica','escritura','migrar','vocacional'] as const).includes(m[1] as any)) {
      setActiveModule(m[1] as any);
    }
  }, [loc.hash]);

  const quizTitle = isEs ? '🎭 ¿Con qué versión de mí conectas más?' : '🎭 Which version of me do you connect with most?';
  const quizText = isEs
    ? 'Descúbrelo respondiendo este breve quiz que también te ayudará a conocer una parte de ti.'
    : 'Find out by taking this short quiz — it might reveal a part of you too.';

  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState<string[]>([]);
  const questions = [
    {
      q: isEs ? '¿Cuál de estas situaciones te describe mejor?' : 'Which of these situations describes you best?',
      opts: isEs
        ? ['A. A veces siento que una canción dice justo lo que yo no sé expresar.', 'B. Me pierdo horas escribiendo o leyendo cosas profundas.', 'C. Siempre termino defendiendo a alguien, ¡aunque no quiera!', 'D. Soy la persona a la que todos acuden cuando necesitan desahogarse.']
        : ['A. A song often says what I can’t express.', 'B. I lose hours writing or reading deep stuff.', 'C. I end up defending someone, even if I don’t mean to!', 'D. People come to me when they need to vent.'],
    },
    {
      q: isEs ? 'Si fueras protagonista de una historia, ¿cuál sería tu arco principal?' : 'If you were the protagonist of a story, what would be your main arc?',
      opts: isEs
        ? ['A. El alma creativa que transforma el dolor en arte.', 'B. El filósofo moderno que escribe lo que otros no se atreven.', 'C. El justiciero con traje que lucha por causas invisibles.', 'D. El sanador que aprendió a curarse para poder ayudar.']
        : ['A. The creative soul turning pain into art.', 'B. The modern philosopher who writes what others won’t.', 'C. The suit-wearing advocate fighting for invisible causes.', 'D. The healer who learned to heal to help others.'],
    },
    {
      q: isEs ? '¿Qué tipo de playlist te representa mejor?' : 'Which playlist represents you best?',
      opts: isEs
        ? ['A. Baladas que te rompen y te reconstruyen', 'B. Poemas en formato acústico', 'C. Luchando con flow: himnos de revolución', 'D. Respira profundo: música para el alma']
        : ['A. Ballads that break and rebuild you', 'B. Poems in acoustic format', 'C. Fighting with flow: anthems of revolution', 'D. Deep breaths: music for the soul'],
    },
    {
      q: isEs ? '¿Cuál de estas frases te hace más sentido?' : 'Which phrase resonates most with you?',
      opts: isEs
        ? ['A. “Una melodía puede ser más sincera que mil palabras.”', 'B. “Escribo porque si no lo hago, me exploto por dentro.”', 'C. “No hay justicia sin compasión.”', 'D. “El bienestar no es un destino, es un proceso.”']
        : ['A. “A melody can be more honest than a thousand words.”', 'B. “I write because if I don’t, I implode.”', 'C. “There is no justice without compassion.”', 'D. “Wellbeing is not a destination; it’s a process.”'],
    },
    {
      q: isEs ? 'Estás en una reunión social, ¿qué rol sueles tener?' : 'At a social gathering, what role do you usually take?',
      opts: isEs
        ? ['A. El que crea magia con la música.', 'B. El que lanza una frase profunda y deja a todos pensando.', 'C. El que arma debates con argumentos que nadie esperaba.', 'D. El que escucha, contiene y suelta verdades sin juzgar.']
        : ['A. The one who creates magic with music.', 'B. The one who drops a deep line and leaves everyone thinking.', 'C. The one who sparks debates with unexpected arguments.', 'D. The one who listens and speaks truth without judging.'],
    },
  ];

  const onChoose = (value: string) => {
    const letter = (value.trim().match(/^[A-D]/i)?.[0] || 'A').toUpperCase();
    const next = [...answers, letter];
    setAnswers(next);
    if (step < questions.length - 1) setStep(step + 1); else setStep(questions.length);
  };

  const resultText = React.useMemo(() => {
    if (answers.length < questions.length) return '';
    const counts: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 };
    answers.forEach(l => { if (counts[l] != null) counts[l]++; });
    const top = (Object.keys(counts) as Array<'A'|'B'|'C'|'D'>).sort((a,b)=>counts[b]-counts[a])[0];
    if (isEs) {
      switch (top) {
        case 'A': return 'Mayoría A: EL ARTISTA DEL ALMA 🎤\nConectas con mi parte musical, con el que transforma emociones en canciones. Probablemente tenemos una banda sonora en común.';
        case 'B': return 'Mayoría B: EL ESCRITOR DEL SUBCONSCIENTE 📚\nTu mente vuela alto. Lo tuyo son las ideas, las palabras con peso y la mirada profunda. Nos entenderíamos en silencios con tinta.';
        case 'C': return 'Mayoría C: EL ABOGADO CON CORAZÓN ⚖️\nTienes sed de justicia, pero sin perder la humanidad. Conectas con mi rol más social, combativo y ético.';
        case 'D':
        default: return 'Mayoría D: EL TERAPEUTA DEL BIENESTAR 🧘\nSientes más de lo que dices. Y sanas más de lo que crees. Mi lado de bienestar emocional sería tu espacio seguro.';
      }
    }
    switch (top) {
      case 'A': return 'Mostly A: THE SOULFUL ARTIST 🎤\nYou connect with my musical side — turning emotions into songs. We probably share a soundtrack.';
      case 'B': return 'Mostly B: THE SUBCONSCIOUS WRITER 📚\nYour mind flies high; words carry weight. We’d understand each other in ink-stained silences.';
      case 'C': return 'Mostly C: THE LAWYER WITH A HEART ⚖️\nThirst for justice without losing humanity. You connect with my social, combative, ethical side.';
      case 'D':
      default: return 'Mostly D: THE WELLBEING THERAPIST 🧘\nYou feel more than you say and heal more than you think. My emotional wellbeing side would be your safe space.';
    }
  }, [answers, isEs, questions.length]);

  const quotes = isEs
    ? [
        'Emigrar es como escribir un nuevo capítulo sin saber el final.',
        'La música no me salvó la vida, pero la hizo más habitable.',
        'La justicia comienza en lo humano, no en los códigos.',
      ]
    : [
        'Migrating is writing a new chapter without knowing the ending.',
        'Music didn’t save my life, but made it more livable.',
        'Justice starts in the human, not in the codes.',
      ];

  const [qIndex, setQIndex] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setQIndex((i) => (i + 1) % quotes.length), 4000);
    return () => clearInterval(id);
  }, [quotes.length]);

  return (
    <div className="fade-in">
      <div className="hero-bar">
        <div className="container">
          <h1 className="hero-title">{heading}</h1>
          <p style={{ marginTop: 8, color: 'var(--brand-bg)', textAlign: 'center' }}>{sub}</p>
        </div>
      </div>

      <div className="container">
        {activeModule === null ? (
          <>
            <div className="connect-hero"><img src={`${BASE}images/conecta_01.png`} alt="Conecta" className="connect-hero-img" /></div>
            <div className="connect-separator" aria-hidden="true"></div>
            <div className="connect-grid">
              {cards.map((c, i) => (
                <div key={i} className="connect-card" onClick={() => setActiveModule(c.id)}>
                  <img src={c.image} alt={c.title} className="connect-card-img" />
                  <div className="connect-card-body">
                    <h3 className="connect-card-title">{c.title}</h3>
                    <p className="connect-card-text">{c.text}</p>
                    <div className="connect-card-cta">{c.cta}</div>
                    <button className="connect-button" onClick={(e) => { e.stopPropagation(); setActiveModule(c.id); }}>AQUI</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="connect-module">
            {(() => {
              const modules = {
                musica: {
                  title: isEs ? 'Deja que la música nos conecte' : 'Let music connect us',
                  images: [`${BASE}images/modulo_musica.png`]
                },
                escritura: {
                  title: isEs ? 'Conecta con las historias de mis libros' : 'Connect with stories from my books',
                  images: [`${BASE}images/modulo_escritura.png`]
                },
                migrar: {
                  title: isEs ? 'Que nos conecte el sentimiento de estar lejos' : 'Let the feeling of being far connect us',
                  images: [`${BASE}images/modulo_migrar.png`]
                },
                vocacional: {
                  title: isEs ? 'Conectemos con justicia y comunicación' : 'Let’s connect with justice and communication',
                  images: [`${BASE}images/modulo_vocacional01.png`, `${BASE}images/modulo_vocacional02.png`]
                }
              } as const;
              const m = modules[activeModule];
              return (
                <>
                  <h2 className="section-title" style={{ textAlign: 'center' }}>{m.title}</h2>
                  <div className="connect-module-images">
                    {m.images.map((src, idx) => (
                      <img key={idx} src={src} alt={m.title} className="connect-module-img" />
                    ))}
                  </div>
                  {activeModule === 'escritura' && (
                    <div className="container" style={{ maxWidth: 1100 }}>
                      <div style={{ background: 'var(--brand-light-bg)', borderRadius: 10, padding: 16, marginTop: 12 }}>
                        <h3 className="section-title" style={{ marginBottom: 8, textAlign: 'center' }}>
                          {isEs ? 'Accede a mis Libros en Amazon' : 'Access my Books on Amazon'}
                        </h3>
                        <p style={{ color: '#24668e', marginBottom: 16, textAlign: 'center' }}>
                          {isEs
                            ? 'Puedes adquirir cualquiera de mis publicaciones en formato e-book desde cualquier lugar a través de la plataforma de Amazon Kindle, y dependiendo del país desde donde te conectas también podrás adquirirlo en formato impreso.'
                            : 'You can get any of my publications as an e‑book from anywhere via Amazon Kindle, and depending on your country you may also get them in print.'}
                        </p>
                        <div style={{ textAlign: 'center', margin: '16px 0' }}>
                          <img src={`${BASE}images/amazonkindle.png`} alt="Amazon Kindle" style={{ maxWidth: 360, width: '100%', height: 'auto' }} />
                        </div>
                        <p style={{ color: '#24668e', marginBottom: 12, textAlign: 'center' }}>
                          {isEs ? (
                            <>
                              entra a mi perfil de autor de amazon donde podrás encontrar toda la información y verificar la disponibilidad en tu país si no estás en Estados Unidos, Países de la Unión Europea, Australia, Canadá o México en la página de amazon.com. Puedes conocer más de mis libros a través de amazon haciendo{' '}
                              <a href="https://amazon.com/author/ernestomendoza" target="_blank" rel="noopener noreferrer" className="contact-link">CLIC AQUI</a>.
                            </>
                          ) : (
                            <>
                              visit my Amazon Author profile to find all the information and check availability in your country. Learn more about my books on Amazon by clicking{' '}
                              <a href="https://amazon.com/author/ernestomendoza" target="_blank" rel="noopener noreferrer" className="contact-link">HERE</a>.
                            </>
                          )}
                        </p>
                        <div style={{ textAlign: 'center', marginTop: 18 }}>
                          <img src={`${BASE}images/googleplaybooks.png`} alt="Google Play Books" style={{ maxWidth: 260, width: '100%', height: 'auto' }} />
                          <div style={{ fontWeight: 800, marginTop: 8 }}>ebooks disponibles en Google Play books</div>
                        </div>
                      </div>

                      {/* Bloques de contenido de Escritura */}
                      <div style={{ display: 'grid', gap: 16, marginTop: 18 }}>
                        {/* Bloque 1: imagen izquierda, texto derecha */}
                        <div style={{ display: 'flex', gap: 16, alignItems: 'stretch', flexWrap: 'wrap' }}>
                          <div style={{ flex: '1 1 280px' }}>
                            <img src={`${BASE}images/escriturabloque1.png`} alt="Bloque 1" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8, background: '#fff' }} />
                          </div>
                          <div style={{ flex: '1 1 320px', background: '#fff', borderRadius: 8, padding: 16, boxShadow: '0 8px 20px rgba(0,0,0,0.08)' }}>
                            <h4 style={{ fontWeight: 800, fontSize: '1.05rem', marginBottom: 10 }}>Lo Unico Urgente es Vivir, aun así, LLegamos Tarde</h4>
                            <p style={{ color: '#333' }}>
                              Vivimos atrapados en la urgencia de la vida, en la prisa por encajar, por ser amados, por demostrar que valemos la pena. Pero, en ese afán, muchas veces nos olvidamos de lo más importante: vivir realmente. Lo Único Urgente es Vivir es mucho más que una novela. Es un viaje introspectivo, una exploración profunda de las emociones humanas, del impacto del pasado en nuestra vida presente y de la necesidad de reconciliarnos con nuestra propia historia. A través de los ojos de Lucas, un personaje que enfrenta las heridas de su infancia y las expectativas de la adultez, esta obra invita al lector a detenerse, a reflexionar y a entender que las cicatrices no definen nuestro futuro, sino que pueden ser el punto de partida para una vida más auténtica.
                            </p>
                          </div>
                        </div>

                        {/* Bloque 2: texto izquierda, imagen derecha (REEMPLAZAR) */}
                        <div style={{ display: 'flex', gap: 16, alignItems: 'stretch', flexWrap: 'wrap', flexDirection: 'row-reverse' }}>
                          <div style={{ flex: '1 1 280px' }}>
                            <img src={`${BASE}images/REEMPLAZA_IMAGEN_BLOQUE2.png`} alt="[REEMPLAZA_IMAGEN_BLOQUE2]" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8, background: '#fff' }} />
                          </div>
                          <div style={{ flex: '1 1 320px', background: '#fff', borderRadius: 8, padding: 16, boxShadow: '0 8px 20px rgba(0,0,0,0.08)' }}>
                            <h4 style={{ fontWeight: 800, fontSize: '1.05rem', marginBottom: 10 }}>EL ULTIMO SUSPIRO DE LA NUEVA ATLANTIDA</h4>
                            <p style={{ color: '#333' }}>Me entusiasma compartir con ustedes una nueva aventura: una fábula romántica y fantástica donde la Atlántida no es solo un mito perdido, sino un espejo de nuestras propias búsquedas interiores. La Atlántida no murió. Solo aprendió a callar.Y bajo el océano, entre ruinas olvidadas y tecnología flotante, aún respira su último suspiro… esperando a ser escuchado. Una historia de almas gemelas, pero no por profecía. Por elección. Una rebelión donde la magia no lanza rayos, sino que vibra en el corazón. Un romance que no promete eternidades, sino presencia real, aunque duela. El último suspiro de la nueva Atlántida es una novela de romantasy emocional, épica y profundamente humana, que reimagina la fantasía desde lo más íntimo: sentir es la revolución.</p>
                          </div>
                        </div>

                        {/* Bloque 3: imagen izquierda, texto derecha (REEMPLAZAR) */}
                        <div style={{ display: 'flex', gap: 16, alignItems: 'stretch', flexWrap: 'wrap' }}>
                          <div style={{ flex: '1 1 280px' }}>
                            <img src={`${BASE}images/REEMPLAZA_IMAGEN_BLOQUE3.png`} alt="[REEMPLAZA_IMAGEN_BLOQUE3]" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8, background: '#fff' }} />
                          </div>
                          <div style={{ flex: '1 1 320px', background: '#fff', borderRadius: 8, padding: 16, boxShadow: '0 8px 20px rgba(0,0,0,0.08)' }}>
                            <h4 style={{ fontWeight: 800, fontSize: '1.05rem', marginBottom: 10 }}>YO, CONTRADICCION ANDANTE</h4>
                            <p style={{ color: '#333' }}>Sumérgete en la vida de Martín Acosta Montenegro, un arquitecto madrileño de 38 años que, entre planos, reuniones burocráticas y pinceladas de humor negro, te invita a acompañarlo en un viaje inolvidable por el laberinto de las emociones humanas. Yo, Contradicción Andante: Un Recorrido por el Complejo Mundo de las Emociones, la nueva novela de Ernesto Mendoza Maldonado, te ofrecerá un retrato auténtico y descarnado de la crisis de los cuarenta, la lucha entre idealismo y pragmatismo, y la búsqueda de sentido en una ciudad que nunca deja de exigir más. Un estilo único, un protagonista inolvidable. Martín desarma su propia existencia a través de un monólogo interior que fluctúa entre la rabia visceral, la melancolía más profunda y esa torpe esperanza de creer en el amor. Su voz, cargada de ironía y sarcasmo, actúa como armadura frente a los fracasos y decepciones, pero también se convierte en puente para conectar con el lector: su vulnerabilidad y sus contradicciones resultan extrañamente familiares. Cada capítulo atiende a una emoción distinta (ilusión, frustración, ira, celos, sorpresa, asco, amor), hilvanando reflexiones filosóficas con agudas observaciones sobre la vida moderna y la burocracia capitalina.</p>
                          </div>
                        </div>

                        {/* Bloque 4: texto izquierda, imagen derecha (REEMPLAZAR) */}
                        <div style={{ display: 'flex', gap: 16, alignItems: 'stretch', flexWrap: 'wrap', flexDirection: 'row-reverse' }}>
                          <div style={{ flex: '1 1 280px' }}>
                            <img src={`${BASE}images/REEMPLAZA_IMAGEN_BLOQUE4.png`} alt="[REEMPLAZA_IMAGEN_BLOQUE4]" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8, background: '#fff' }} />
                          </div>
                          <div style={{ flex: '1 1 320px', background: '#fff', borderRadius: 8, padding: 16, boxShadow: '0 8px 20px rgba(0,0,0,0.08)' }}>
                            <h4 style={{ fontWeight: 800, fontSize: '1.05rem', marginBottom: 10 }}>LIVING IS THE ONLY RUSH, AND YET, WE STILL RUN LATE</h4>
                            <p style={{ color: '#333' }}>This is the English edition of my first book, "Lo Único Urgente es Vivir, y aun asi, Llegamos Tarde" , titled for this edition  "Living is the only Rush, and yet, We Still Run Late," this work channels my deep-seated need to explore, to heal, and to connect. In this story, through an alter-ego and a blend of truth and fiction, I delve into how I've come to understand a fundamental truth: we come into this world with a single, paramount mission – to truly live. This body and this soul are precious loans, and therefore, nothing can be more important than ensuring we care for ourselves, love ourselves, and instead of chasing baseless affections, goals imposed upon us by others, or a thousand other things beyond our control, we must relentlessly pursue our own happiness. So, I invite you to navigate alongside Lucas through a sea of emotions, scars, and ultimately, redemption.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {activeModule === 'musica' && (
                    <div className="container" style={{ maxWidth: 1100 }}>
                      <div style={{ background: 'var(--brand-light-bg)', borderRadius: 10, padding: 16, marginTop: 12 }}>
                        <div style={{ fontWeight: 800, fontSize: '1.05rem', marginBottom: 8 }}>
                          {isEs ? 'Te invito a conectar con mis sonidos y mis letras' : 'I invite you to connect with my sounds and my lyrics'}
                        </div>
                        <div style={{ color: '#24668e', marginBottom: 10 }}>
                          {isEs
                            ? 'Como intérprete publico mi música bajo el nombre de Erness y por eso mis plataformas relacionadas con mi faceta como cantautor suelen ser @ErnessOfficial. Puedes escuchar mi música en tu plataforma preferida.'
                            : 'As an artist I release music under the name Erness, so my profiles are usually @ErnessOfficial. You can listen on your preferred platform.'}
                        </div>
                        <div style={{ background: '#fff', borderRadius: 8, padding: 12, color: '#333' }}>
                          {isEs
                            ? 'Sigue el enlace de tu plataforma de música preferida y conoce mi manera de comunicar sentimientos más profundos. Componer me ha dado la posibilidad de drenar mis tuberías emocionales con libertad. En mi cuenta de SoundCloud podrás además escuchar algunos covers de temas conocidos que he versionado intentando imprimir mi estilo y si prefieres los videos no dejes de visitar mi canal musical en YouTube en el que subo videos de mis canciones.'
                            : "Follow the link to your favourite music platform and discover how I convey deeper feelings. Songwriting lets me release and channel emotions with freedom. On my SoundCloud you'll also find covers of well‑known songs where I try to bring my own style, and if you prefer videos, don't miss my YouTube music channel where I upload videos of my songs."}
                        </div>
                      </div>
                      <div style={{ background: '#f7fbff', borderRadius: 10, padding: 16, marginTop: 14 }}>
                        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 12 }}>
                          <li style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <IconAppleMusic />
                            <a href="https://music.apple.com/gb/artist/erness/1511155802" target="_blank" rel="noopener noreferrer" className="contact-link">{isEs ? 'Escuchar la música de Erness en Apple Music' : 'Listen to Erness on Apple Music'}</a>
                          </li>
                          <li style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <IconSpotify />
                            <a href="https://open.spotify.com/intl-es/artist/0ZSkMQRAxtOUca0wbAInJR?si=HgLQLG-ITCq9zOl01AfMLw" target="_blank" rel="noopener noreferrer" className="contact-link">{isEs ? 'Escuchar la música de Erness en Spotify' : 'Listen to Erness on Spotify'}</a>
                          </li>
                          <li style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <IconYouTubeMusic />
                            <a href="https://music.youtube.com/channel/UCvHPXZ26iLwHp4_uZNR9Udg?si=Q8VHKck0VVwlvzQQ" target="_blank" rel="noopener noreferrer" className="contact-link">{isEs ? 'Escuchar la música de Erness en YouTube Music' : 'Listen to Erness on YouTube Music'}</a>
                          </li>
                          <li style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <IconYouTube />
                            <a href="https://www.youtube.com/channel/UCGsyq1loldlo3KSDvsni5cA" target="_blank" rel="noopener noreferrer" className="contact-link">{isEs ? 'Visita y suscríbete a mi Canal en YouTube @ErnessOfficial y echa un vistazo a mi contenido multimedia musical' : 'Visit and subscribe to my YouTube channel @ErnessOfficial and explore my music videos'}</a>
                          </li>
                          <li style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <IconSoundCloud />
                            <a href="https://soundcloud.com/ernesto-mendoza-maldonado?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing" target="_blank" rel="noopener noreferrer" className="contact-link">{isEs ? 'Escucha mi música original y los covers de otros artistas en mi canal de SoundCloud' : 'Listen to my original music and cover versions on my SoundCloud'}</a>
                          </li>
                        </ul>
                        <div style={{ textAlign: 'center', marginTop: 16 }}>
                          <img src={`${BASE}images/suscribeteyoutube.png`} alt={isEs ? 'Suscríbete en YouTube' : 'Subscribe on YouTube'} style={{ maxWidth: 280, width: '100%', height: 'auto' }} />
                          <div style={{ marginTop: 8 }}>
                            <a href="https://www.youtube.com/channel/UCGsyq1loldlo3KSDvsni5cA" target="_blank" rel="noopener noreferrer" className="connect-button" style={{ background: '#cc0000' }}>{isEs ? 'AQUI' : 'HERE'}</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div style={{ textAlign: 'center', marginTop: 14 }}>
                    <button className="card-button" onClick={() => setActiveModule(null)}>{isEs ? 'Regresar' : 'Back'}</button>
                  </div>
                </>
              );
            })()}
          </div>
        )}

        <div className="quiz-box">
          <h3 className="section-title" style={{ marginBottom: 10 }}>{quizTitle}</h3>
          <p style={{ textAlign: 'center', marginBottom: 16 }}>{quizText}</p>

          {step < questions.length ? (
            <div className="quiz-step">
              <p className="quiz-q">{questions[step].q}</p>
              <div className="quiz-options">
                {questions[step].opts.map((opt) => (
                  <button key={opt} className="nav-link quiz-option" onClick={() => onChoose(opt)}>{opt}</button>
                ))}
              </div>
              <div className="quiz-progress">{isEs ? 'Pregunta' : 'Question'} {step + 1}/{questions.length}</div>
            </div>
          ) : (
            <div className="quiz-result">
              <p className="quiz-result-text" style={{ whiteSpace: 'pre-line' }}>{resultText}</p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <a className="card-button" href="https://ernestomendoza.entrepalabrasurgentes.com" target="_blank" rel="noopener noreferrer">
                  {isEs ? 'Conoce más de mi historia' : 'Know more about my story'}
                </a>
                <button className="card-button" onClick={() => setStep(0)}>{isEs ? 'Volver a empezar' : 'Start again'}</button>
              </div>
            </div>
          )}
        </div>

        <div className="quote-slider">
          <div className="quote-slide" key={qIndex}>{quotes[qIndex]}</div>
          <div className="quote-indicators">
            {quotes.map((_, i) => (
              <span key={i} className={`dot ${i === qIndex ? 'active' : ''}`}></span>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 12 }}>
            <a className="card-button" href="https://ernestomendoza.entrepalabrasurgentes.com" target="_blank" rel="noopener noreferrer">
              {isEs ? 'Descubre más en mi espacio personal' : 'Discover more in my personal space'}
            </a>
          </div>
        </div>

        <div className="connect-closing">
          <p>
            {isEs
              ? 'Esta es solo una pincelada. Si quieres conocer a Ernesto Mendoza en profundidad —el músico, escritor, profesional y migrante— visita mi espacio personal.'
              : 'This is just a glimpse. If you want to know Ernesto Mendoza in depth — the musician, writer, professional and migrant — visit my personal space.'}
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a className="card-button" href="https://ernestomendoza.entrepalabrasurgentes.com" target="_blank" rel="noopener noreferrer">
              ernestoMendoza.entrepalabrasurgentes.com
            </a>
            <button className="card-button" onClick={() => setActiveSection('explore')}>
              {isEs ? 'Sigue explorando aquí' : 'Keep exploring here'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MainContent: React.FC<Props> = ({ activeSection, setActiveSection }) => {
  const { language } = useLanguage();
  const t = language === 'es' ? translationsEs : translationsEn;
  const [transformView, setTransformView] = React.useState<'main'|'micro-form'|'micro-course'>('main');
  const [microLang, setMicroLang] = React.useState<'es'|'en'>(language as 'es'|'en');
  const [microForm, setMicroForm] = React.useState({ name: '', age: '', email: '', accept: 'yes' });
  const [microCourseLoading, setMicroCourseLoading] = React.useState(false);
  const [microErrors, setMicroErrors] = React.useState<{name?: string; age?: string; email?: string; accept?: string}>({});
  const [microMsg, setMicroMsg] = React.useState<{type: 'success'|'error'|'warning'|null; text: string}>({ type: null, text: '' });
  const [submitting, setSubmitting] = React.useState(false);
  React.useEffect(() => { setMicroLang(language as 'es'|'en'); }, [language]);
  React.useEffect(() => {
    try {
      const saved = window.localStorage.getItem('epu:micro-form');
      if (saved) {
        const parsed = JSON.parse(saved);
        setMicroForm({
          name: parsed.name || '',
          age: parsed.age || '',
          email: parsed.email || '',
          accept: parsed.accept || 'yes',
        });
        if (parsed.lang) setMicroLang(parsed.lang);
      }
    } catch {}
  }, []);

  const submitMicroRegistration = async (): Promise<{ ok: boolean; forwarded?: boolean }> => {
    const payload = {
      name: microForm.name,
      age: microForm.age,
      email: microForm.email,
      // Sheet validation expects exact option: 'SI, ACEPTO'
      accept: 'SI, ACEPTO',
      lang: microLang === 'es' ? 'ESPAÑOL' : 'ENGLISH',
      date: new Date().toISOString(),
    };
    try {
      window.localStorage.setItem('epu:micro-form', JSON.stringify({ ...payload, lang: microLang }));
    } catch {}
    try {
      const r = await fetch('/api/micro-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!r.ok) return { ok: false };
      const data = await r.json().catch(()=>({ ok: true }));
      return { ok: Boolean(data?.ok ?? true), forwarded: Boolean(data?.forwarded) };
    } catch {
      return { ok: false };
    }
  };

  const validateMicroForm = () => {
    const errs: typeof microErrors = {};
    const name = (microForm.name || '').trim();
    const age = Number(microForm.age);
    const email = (microForm.email || '').trim();
    if (name.length < 2) errs.name = language === 'es' ? 'Ingresa tu nombre completo.' : 'Please enter your name.';
    if (!(age > 0 && age < 130)) errs.age = language === 'es' ? 'Ingresa una edad válida.' : 'Enter a valid age.';
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) errs.email = language === 'es' ? 'Correo no válido.' : 'Invalid email address.';
    if (microForm.accept !== 'yes') errs.accept = language === 'es' ? 'Debes aceptar para continuar.' : 'You must accept to continue.';
    setMicroErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const mainCards = [
    { image: `${BASE}images/home2.png`, title: t.exploreTitle, text: t.exploreText, button: t.explore, section: 'explore' },
    { image: `${BASE}images/home3.png`, title: t.connectTitle, text: t.connectText, button: t.connect, section: 'connect' },
    { image: `${BASE}images/home4.png`, title: t.transformTitle, text: t.transformText, button: t.transform, section: 'transform' },
  ];

  const subCards = [
    // CONOCER -> CONOCEME
    {
      image: `${BASE}images/home5.png`,
      title: language === 'es' ? 'CONÓCEME' : 'GET TO KNOW ME',
      text: language === 'es'
        ? 'Mi nombre es Ernesto Mendoza, la mente y el corazón detrás de Entre Palabras Urgentes. Quizás conociendo un poco mi esencia y la profunda inspiración que dio vida a esta plataforma, encuentres ese punto en el que estoy seguro de que conectaremos. Aquí no solo conocerás mi historia personal y los valores que la sustentan, sino también la visión completa que da forma a este proyecto dedicado al bienestar emocional desde el aprendizaje crítico‑reflexivo.'
        : 'My name is Ernesto Mendoza — the mind and heart behind Entre Palabras Urgentes. By discovering a bit of my essence and the deep inspiration that brought this platform to life, you may find that point where I’m sure we will connect. Here you will not only get to know my personal story and the values that sustain it, but also the broader vision shaping this project devoted to emotional well‑being through critical and reflective learning.',
      button: t.connect,
      section: 'connect'
    },
    // OPINAR -> DESCARGA GRATIS (lleva al módulo Escritura dentro de Conecta)
    {
      image: `${BASE}images/home6.png`,
      title: language === 'es' ? 'DESCARGA GRATIS' : 'FREE DOWNLOAD',
      text: language === 'es'
        ? 'Te invito a conocer y disfrutar de las historias que conforman cada uno de los libros que he escrito y que están publicados y disponibles tanto en versión e‑book en las plataformas de Amazon Kindle y Google Play Books, como en versión impresa directamente en la tienda online de Amazon dentro de la sección de Libros. Por eso quiero hacerte un regalo muy especial: entra en esta sección y descarga totalmente gratis una vista previa con los primeros capítulos de mis libros en formato PDF, para que puedas leerla en tu dispositivo móvil, en tu tablet o en tu ordenador como un e‑book o como un archivo. Entra en el mundo de mis personajes y en historias que van desde la ficción y la fantasía hasta la más honesta realidad de mi vida.'
        : 'I invite you to explore and enjoy the stories behind each of my books — available as e‑books on Amazon Kindle and Google Play Books, and also in print on Amazon. As a special gift, in this section you can download a free preview with the first chapters of my books in PDF format, so you can read it on your mobile device, tablet, or computer — either as an e‑book or as a regular file. Step into the world of my characters and into stories that range from fiction and fantasy to the most honest reality of my life.',
      button: language === 'es' ? 'Descarga Gratis' : 'Download Free',
      section: 'connect',
      module: 'escritura' as const
    },
    // CONSTRUIR -> Construye (redirige a Transforma)
    {
      image: `${BASE}images/home7.png`,
      title: language === 'es' ? 'Construye' : 'Build',
      text: language === 'es'
        ? 'Da el primer paso hacia tu verdadera transformación construyendo tu propio conocimiento. En un mundo que nos empuja a memorizar y repetir, creemos que el verdadero aprendizaje nace de la reflexión y la experiencia. Cuando el conocimiento se construye desde dentro, se convierte en una parte intrínseca de ti, un hábito natural que aplicas sin esfuerzo. Accede GRATIS al Módulo 1 de Micro‑Learning para el Autoconocimiento que desarrollamos con AnImiKdemi.'
        : 'Take the first step towards your true transformation by building your own knowledge. In a world that pushes us to memorise and repeat, we believe that true learning is born from reflection and experience. When knowledge is built from within, it becomes an intrinsic part of you — a natural habit you apply effortlessly. Get FREE access to Module 1 of the Micro‑Learning for Self‑Knowledge we developed with AnImiKdemi.',
      button: language === 'es' ? 'Transforma' : 'Transform',
      section: 'transform'
    },
    // REFLEXIONAR (sin cambios de contenido)
    { image: `${BASE}images/home8.png`, title: t.reflectTitle, text: t.reflectText, button: t.explore, section: 'explore' },
  ];

  const renderHome = () => (
    <div className="fade-in">
      <div className="hero-bar"><div className="container"><h1 className="hero-title">{t.mainTitle}</h1></div></div>
      <div className="container">
        <div className="intro-text">
          <p><span className="intro-firstline">{(t.introText || '').split('\n')[0]}</span></p>
          <p className="intro-rest">{(t.introText || '').split('\n').slice(1).join('\n')}</p>
        </div>
        <h2 className="section-title">{t.subtitle}</h2>
        <div className="cards-container">
          {mainCards.map((card, idx) => (
            <div key={idx} className="card">
              <img src={card.image} alt={card.title} className="card-image" />
              <div className="card-content">
                <h3 className="card-title">{card.title}</h3>
                <p className="card-text">{card.text}</p>
                <button onClick={() => setActiveSection(card.section)} className="card-button">{card.button}</button>
              </div>
            </div>
          ))}
        </div>
        <div className="cards-container--sub">
          {subCards.map((card, idx) => (
            <div key={idx} className="card card--sub">
              <img src={card.image} alt={card.title} className="card-image" />
              <div className="card-content">
                <h3 className="card-title">{card.title}</h3>
                <p className="card-text">{card.text}</p>
                <button
                  onClick={() => {
                    if ((card as any).module) {
                      try { window.location.hash = `#connect:${(card as any).module}` } catch {}
                    }
                    setActiveSection(card.section)
                  }}
                  className="card-button"
                >
                  {card.button}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="image-container">
          <a href="https://www.entrepalabrasurgentes.com/animik-interactivo/el-tiempo-viajar-entre-el-ayer-y-el-ma%C3%B1ana" target="_blank" rel="noopener noreferrer">
            <img className="half-image" src={`${BASE}images/home1.png`} alt="Ilustración" />
          </a>
        </div>
        <div className="video-container fade-in">
          <h2 className="section-title">{t.videoTitle}</h2>
          <div className="video-wrapper">
            {/* Temporarily commenting out the video until we have a proper solution */}
            <div style={{ 
              background: '#f0f0f0', 
              padding: '2rem', 
              borderRadius: '8px',
              textAlign: 'center' 
            }}>
              {language === 'es' ? 'Video próximamente' : 'Video coming soon'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderExplore = () => (<ExploreSection language={language as 'es' | 'en'} t={t} />);

  const renderConnect = () => (<ConnectSection language={language as 'es' | 'en'} setActiveSection={setActiveSection} />);

  const renderTransform = () => (
    <div className="fade-in">
      <div className="hero-bar"><div className="container"><h1 className="hero-title">{t.transform}</h1></div></div>
      {transformView === 'main' && (
        <>
          <div className="container" style={{ maxWidth: 1100 }}>
            <div style={{ background: 'var(--brand-light-bg)', borderRadius: 10, padding: 18, boxShadow: '0 6px 16px rgba(0,0,0,.08)' }}>
              <p style={{ color: '#293249', fontSize: '1.25rem', lineHeight: 1.6, margin: 0 }}>
                {t.transformIntro1}
              </p>
              <div style={{ height: 10 }}></div>
              <p style={{ color: '#45225E', fontSize: '1.1rem', lineHeight: 1.6, margin: 0 }}>
                {t.transformIntro2}
              </p>
            </div>

            <div className="connect-separator" aria-hidden="true" style={{ marginTop: 16 }}></div>

            <div className="video-container fade-in">
              <h2 className="section-title" style={{ textAlign: 'center' }}>
                {language === 'es' ? 'Video destacado' : 'Featured Video'}
              </h2>
              <div className="video-wrapper">
                <iframe
                  src="https://www.youtube.com/embed/TFR2QCMO5V8"
                  title="YouTube video - entrepalabrasurgentes"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </div>

          {/* Full-width info band */}
          <div style={{ width: '100%', background: '#24668e', marginTop: 20 }}>
            <div className="container" style={{ maxWidth: 1100, paddingTop: 18, paddingBottom: 18 }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                <img src={`${BASE}images/transforma01.png`} alt="Transforma" style={{ width: 280, maxWidth: '100%', height: 'auto', borderRadius: 8, background: '#fff', flex: '0 0 auto' }} />
                <div style={{ flex: '1 1 320px', color: '#fff', fontSize: '1.25rem', lineHeight: 1.6 }}>
                  {language === 'es'
                    ? 'Transformar es un viaje interior: un movimiento sutil que convierte las cicatrices en aprendizajes y las dudas en caminos. Cada emoción que sentimos nos invita a mirarnos con valentía, a soltar lo que pesa y a cultivar lo que nos hace florecer. La verdadera transformación no viene de afuera, nace en nuestra decisión de reescribirnos cada día, de reconocernos como autores de nuestro propio bienestar.'
                    : 'Transformation is an inner journey: a subtle motion that turns scars into lessons and doubts into paths. Every emotion invites us to look at ourselves with courage, to let go of what weighs us down, and to cultivate what helps us flourish. True transformation does not come from outside; it is born in our decision to rewrite ourselves each day and to recognise ourselves as authors of our own well‑being.'}
                </div>
              </div>

              {/* Card below the text */}
              <div style={{ marginTop: 16 }}>
                <div style={{ background: '#dd566f', borderRadius: 12, padding: 16, boxShadow: '0 8px 20px rgba(0,0,0,0.12)' }}>
                  <div style={{ textAlign: 'center' }}>
                    <img src={`${BASE}images/logo_animikdemi.png`} alt="AnImiKdemi" style={{ width: 200, maxWidth: '80%', height: 'auto', display: 'block', margin: '0 auto 10px' }} />
                  </div>
                  <div style={{ background: '#fff', borderRadius: 10, padding: 12 }}>
                    <h2 className="section-title" style={{ color: '#dd566f', fontWeight: 900, fontSize: 'clamp(1.6rem, 5vw, 2.2rem)', margin: '0 0 8px 0' }}>
                      {language === 'es' ? 'Comienza tu Transformación' : 'Start Your Transformation'}
                    </h2>
                    <p style={{ color: '#dd566f', fontWeight: 700, fontSize: '1.1rem', lineHeight: 1.6, background: 'transparent', margin: 0 }}>
                      {language === 'es'
                        ? 'Da el primer  paso  para  tu verdadera transformación  construyendo tu propio conocimiento. En un mundo que nos empuja a memorizar y repetir, creemos que el verdadero aprendizaje nace de la reflexión y la experiencia. Cuando el conocimiento se construye desde dentro, se convierte en una parte intrínseca de ti, un hábito natural que aplicas sin esfuerzo. Accede GRATIS al Modulo 1  de Micro-Learning para el Autoconocimiento que desarrollamos con AnImiKdemi.'
                        : 'Take the first step towards true transformation by building your own knowledge. In a world that pushes us to memorise and repeat, we believe true learning is born from reflection and experience. When knowledge is constructed from within, it becomes an intrinsic part of you—a natural habit you apply with ease. Get FREE access to Module 1 of Micro‑Learning for Self‑Knowledge that we developed with AnImiKdemi.'}
                    </p>
                  </div>
                  <div style={{ textAlign: 'center', marginTop: 12 }}>
                    <button
                      className="connect-button"
                      onClick={() => setTransformView('micro-form')}
                    >
                      {language === 'es' ? 'Micro‑Learning Gratis Aquí' : 'Free Micro‑Learning Here'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {transformView === 'micro-form' && (
        <div className="container" style={{ maxWidth: 900 }}>
          <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '6px 0 8px' }}>
            <button className="connect-button" onClick={() => setTransformView('main')}>
              {language === 'es' ? 'Volver' : 'Back'}
            </button>
          </div>
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            {language === 'es' ? 'Entrar al MicroLearning Gratuito' : 'Enter the Free MicroLearning'}
          </h2>
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <img src={`${BASE}images/modulocurso1.png`} alt="Módulo 1" style={{ width: '100%', maxWidth: 900, height: 'auto', borderRadius: 8, boxShadow: '0 6px 16px rgba(0,0,0,.12)' }} />
          </div>
          <div style={{ background: 'var(--brand-light-bg)', borderRadius: 10, padding: 16, boxShadow: '0 6px 16px rgba(0,0,0,.08)' }}>
            <h3 className="section-title" style={{ textAlign: 'center', marginBottom: 8 }}>
              {language === 'es' ? 'Completa el formulario para Comenzar la formación' : 'Complete the form to start learning'}
            </h3>
            <form onSubmit={async (e) => {
              e.preventDefault();
              setMicroMsg({ type: null, text: '' });
              if (!validateMicroForm()) return;
              setSubmitting(true);
              const res = await submitMicroRegistration();
              if (res.ok) {
                const okText = language === 'es'
                  ? (res.forwarded ? 'Registro guardado correctamente. Redirigiendo al curso…' : 'Registro enviado. Redirigiendo al curso…')
                  : (res.forwarded ? 'Registration saved successfully. Redirecting to the course…' : 'Registration sent. Redirecting to the course…');
                setMicroMsg({ type: 'success', text: okText });
              } else {
                setMicroMsg({ type: 'warning', text: language === 'es' ? 'No se pudo registrar en la hoja, pero podrás acceder al curso igualmente.' : 'Couldn’t save to the sheet, but you can still access the course.' });
              }
              setTimeout(() => { setMicroCourseLoading(true); setTransformView('micro-course'); setSubmitting(false); }, 600);
            }}>
              {microMsg.type && (
                <div aria-live="polite" style={{
                  background: microMsg.type === 'success' ? '#e6ffed' : microMsg.type === 'warning' ? '#fff3cd' : '#fdecea',
                  color: '#333', borderRadius: 8, padding: 12, marginBottom: 10,
                }}>
                  {microMsg.text}
                </div>
              )}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontWeight: 800 }}>{language === 'es' ? 'Nombre' : 'Name'}</label>
                  <input value={microForm.name} onChange={(e)=>setMicroForm({...microForm, name: e.target.value})} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd' }} />
                  {microErrors.name && <div style={{ color: '#c0392b', fontSize: '.9rem' }}>{microErrors.name}</div>}
                </div>
                <div>
                  <label style={{ fontWeight: 800 }}>{language === 'es' ? 'Edad' : 'Age'}</label>
                  <input type="number" min={0} value={microForm.age} onChange={(e)=>setMicroForm({...microForm, age: e.target.value})} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd' }} />
                  {microErrors.age && <div style={{ color: '#c0392b', fontSize: '.9rem' }}>{microErrors.age}</div>}
                </div>
                <div>
                  <label style={{ fontWeight: 800 }}>{language === 'es' ? 'Correo electrónico' : 'Email'}</label>
                  <input type="email" value={microForm.email} onChange={(e)=>setMicroForm({...microForm, email: e.target.value})} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd' }} />
                  {microErrors.email && <div style={{ color: '#c0392b', fontSize: '.9rem' }}>{microErrors.email}</div>}
                </div>
                <div>
                  <label style={{ fontWeight: 800 }}>{language === 'es' ? 'Idioma del curso' : 'Course language'}</label>
                  <select value={microLang} onChange={(e)=>setMicroLang(e.target.value as 'es'|'en')} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd' }}>
                    <option value="es">Español</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>
              <div style={{ marginTop: 12 }}>
                <label style={{ fontWeight: 800 }}>
                  {language === 'es'
                    ? 'Acepto recibir en mi correo información gratuita sobre nuevas acciones y recursos de bienestar emocional'
                    : 'I accept receiving free updates and resources on emotional well‑being in my email'}
                </label>
                <div>
                  <select value={microForm.accept} onChange={(e)=>setMicroForm({...microForm, accept: e.target.value})} style={{ width: '100%', maxWidth: 300, padding: 10, borderRadius: 8, border: '1px solid #ddd' }}>
                    <option value="yes">{language === 'es' ? 'Sí, acepto.' : 'Yes, I accept.'}</option>
                  </select>
                  {microErrors.accept && <div style={{ color: '#c0392b', fontSize: '.9rem' }}>{microErrors.accept}</div>}
                </div>
              </div>
              <div style={{ textAlign: 'center', marginTop: 14 }}>
                <button type="submit" className="connect-button" disabled={submitting}>
                  {submitting ? (language === 'es' ? 'Enviando…' : 'Sending…') : (language === 'es' ? 'ENTRAR' : 'ENTER')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {transformView === 'micro-course' && (
        <div className="container" style={{ maxWidth: 1100 }}>
          <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '6px 0 8px' }}>
            <button className="connect-button" onClick={() => setTransformView('main')}>
              {language === 'es' ? 'Volver' : 'Back'}
            </button>
          </div>
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            {language === 'es' ? 'Módulo 1 – MicroLearning de Autoconocimiento' : 'Module 1 – Self‑Knowledge MicroLearning'}
          </h2>
          <div className="video-wrapper" style={{ paddingBottom: '64%', position: 'relative' }}>
            {microCourseLoading && (
              <div style={{
                position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(255,255,255,0.85)', zIndex: 2, borderRadius: 8
              }}>
                <div style={{ textAlign: 'center', color: '#24668e', fontWeight: 800 }}>
                  {language === 'es' ? 'Cargando…' : 'Loading…'}
                </div>
              </div>
            )}
            <iframe
              src={microLang === 'es' ? 'https://ernessofficial.github.io/cultivar-autonocimiento-mod1/?lang=es' : 'https://ernessofficial.github.io/cultivar-autonocimiento-mod1/?lang=en'}
              title="MicroLearning"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              onLoad={() => setMicroCourseLoading(false)}
            />
          </div>
        </div>
      )}
    </div>
  );

  const renderContact = () => (
    <div className="fade-in">
      <div className="hero-bar"><div className="container"><h1 className="hero-title">{language === 'es' ? 'Contacta' : 'Contact'}</h1></div></div>
      <div className="container" style={{ maxWidth: 1100 }}>
        <h2 className="section-title" style={{ textAlign: 'center' }}>
          {language === 'es'
            ? 'Si tienes alguna pregunta, quieres consultar algo adicional o compartir algún comentario o sugerencia, no lo dudes'
            : 'If you have any questions, need anything else or want to share a comment or suggestion, don’t hesitate'}
        </h2>
        <p style={{ textAlign: 'center', fontSize: '1.05rem', marginBottom: 16 }}>
          {language === 'es' ? 'Queremos escuchar tus palabras urgentes' : 'We want to hear your urgent words'}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {/* Tarjeta 1 */}
              <div style={{ background: '#4b2e83', color: '#fff', borderRadius: 10, padding: 16 }}>
                <p style={{ fontSize: '1rem', lineHeight: 1.5 }}>
                  {language === 'es'
                    ? 'Escribe un email directamente a '
                    : 'Write an email directly to '}
                  <a href="mailto:info@entrepalabrasurgentes.com" style={{ color: '#fff', textDecoration: 'underline' }}>info@entrepalabrasurgentes.com</a>
                  {language === 'es' ? ' o alternativamente a la dirección ' : ' or alternatively to '}
                  <a href="mailto:ernestomendoza@entrepalabrasurgentes.com" style={{ color: '#fff', textDecoration: 'underline' }}>ernestomendoza@entrepalabrasurgentes.com</a>.
                </p>
              </div>
              {/* Tarjeta 2 */}
              <div style={{ background: '#f6f2ff', color: '#4b2e83', borderRadius: 10, padding: 16, fontWeight: 800 }}>
                <div style={{ marginBottom: 10 }}>
                  {language === 'es' ? 'sigue esta plataforma en las redes sociales' : 'follow this platform on social media'}
                </div>
                <div className="social-links" style={{ justifyContent: 'flex-start', marginBottom: 0 }}>
                  <a href="https://www.youtube.com/channel/UCGsyq1loldlo3KSDvsni5cA" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="YouTube">
                    <FooterIconYouTube /> <span style={{ marginLeft: 6 }}>YouTube</span>
                  </a>
                  <a href="https://www.facebook.com/share/1AC2guzVom/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
                    <IconFacebook /> <span style={{ marginLeft: 6 }}>Facebook</span>
                  </a>
                  <a href="https://www.instagram.com/entr3palabrasurgentes?igsh=bmp3aG12MTRqbWt1&utm_source=qr" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                    <IconInstagram /> <span style={{ marginLeft: 6 }}>Instagram</span>
                  </a>
                  <a href="https://www.tiktok.com/@entrepalabrasurge?_t=ZN-8zsZRrC2fCw&_r=1" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="TikTok">
                    <IconTikTok /> <span style={{ marginLeft: 6 }}>TikTok</span>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                    <IconLinkedIn /> <span style={{ marginLeft: 6 }}>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactúa (título estilo barra) antes del formulario */}
        <div style={{ marginTop: 18, marginBottom: 8 }}>
          <div style={{ background: '#24668e', padding: '14px 16px', borderRadius: 8, boxShadow: '0 6px 16px rgba(0,0,0,.12)' }}>
            <h2 style={{
              margin: 0,
              color: 'var(--brand-bg)',
              textTransform: 'uppercase',
              fontWeight: 800,
              letterSpacing: '.04em',
              fontSize: 'clamp(1.6rem,5vw,3rem)'
            }}>
              {language === 'es' ? 'Interactúa' : 'Interact'}
            </h2>
          </div>
        </div>

        <div style={{ marginTop: 10, display: 'flex', justifyContent: 'center' }}>
          <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeW_qQEkYe6mPaKcZDPyAILmCp_z4W0oJUFpts0FFKqtEhbNA/viewform?embedded=true" width="640" height="1524" frameBorder={0} marginHeight={0} marginWidth={0} title="Formulario de Contacto">Cargando…</iframe>
        </div>
      </div>
    </div>
  );

  const renderInteract = () => (
    <div className="fade-in">
      <div className="hero-bar"><div className="container"><h1 className="hero-title">{t.interact}</h1></div></div>
      <div className="container"><p>Contenido de Interactúa (a definir).</p></div>
    </div>
  );

  const renderLearn = () => (
    <div className="fade-in">
      <div className="hero-bar"><div className="container"><h1 className="hero-title">{t.learn}</h1></div></div>
      <div className="container"><p>Contenido de Aprende (a definir).</p></div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'explore': return renderExplore();
      case 'connect': return renderConnect();
      case 'transform': return renderTransform();
      case 'contact': return renderContact();
      // Interact y Learn ocultos / no accesibles
      case 'interact': return renderContact();
      case 'learn': return renderHome();
      default: return renderHome();
    }
  };

  return <main className="main-content">{renderSection()}</main>;
};
export default MainContent;
