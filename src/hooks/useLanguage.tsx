import React,{useState,createContext,useContext,useEffect} from 'react';
type Language='es'|'en'; interface LanguageContextType{language:Language;setLanguage:(l:Language)=>void}
const LanguageContext=createContext<LanguageContextType|undefined>(undefined);
export const LanguageProvider:React.FC<{children:React.ReactNode}>=({children})=>{
  const [language,setLanguage]=useState<Language>(()=>{
    try{
      const saved=(typeof window!=='undefined')?window.localStorage.getItem('epu:lang'):null;
      return (saved==='en'||saved==='es')?saved:'es'
    }catch{ return 'es' }
  });
  useEffect(()=>{ try{ window.localStorage.setItem('epu:lang', language) }catch{} },[language]);
  return(<LanguageContext.Provider value={{language,setLanguage}}>{children}</LanguageContext.Provider>)
};
export const useLanguage=()=>{const ctx=useContext(LanguageContext);if(!ctx) throw new Error('useLanguage must be used within a LanguageProvider');return ctx};
