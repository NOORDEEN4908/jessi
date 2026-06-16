import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail, Phone, MapPin, Linkedin, ArrowUpRight,
  Target, TrendingUp, Search, Share2, BarChart2, Megaphone,
  Award, User, ExternalLink, Menu, X, ChevronRight,
  Globe, BarChart, Users, Zap
} from 'lucide-react'
import pic1 from "./Asset/wh4.png"
import pic2 from "./Asset/Capture.PNG"

/* ─── TOKENS ─── */
const C = {
  bg: '#05070F', surface: '#0D1020', border: 'rgba(255,255,255,0.06)',
  accent: '#E040FB', accentDim: 'rgba(224,64,251,0.15)', accentGlow: 'rgba(224,64,251,0.35)',
  gold: '#FFD166', text: '#EAE8F0', muted: 'rgba(234,232,240,0.5)', white: '#FFFFFF',
}

/* ─── useBreakpoint ─── */
function useBreakpoint() {
  const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
  useEffect(() => {
    const fn = () => setW(window.innerWidth)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  return { isMobile: w < 640, isTablet: w >= 640 && w < 1024, isDesktop: w >= 1024, w }
}

/* ─── GLOBAL STYLES ─── */
const GlobalStyle = () => {
  useEffect(() => {
    const el = document.createElement('style')
    el.textContent = `
      *, *::before, *::after { box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      body { background:${C.bg}; color:${C.text}; font-family:'Space Grotesk',sans-serif; overflow-x:hidden; margin:0; padding:0; cursor:none; }
      @media (max-width:639px) { body { cursor:auto; } }
      ::selection { background:${C.accentGlow}; }
      ::-webkit-scrollbar { width:3px; }
      ::-webkit-scrollbar-track { background:${C.bg}; }
      ::-webkit-scrollbar-thumb { background:${C.accent}; border-radius:2px; }
      .gradient-text {
        background: linear-gradient(135deg,#E040FB 0%,#FF6B9D 50%,#FFD166 100%);
        -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
      }
      .glow-border { border:1px solid rgba(224,64,251,0.25); box-shadow:0 0 24px rgba(224,64,251,0.06); }
      .card-hover { transition: transform 0.25s ease, box-shadow 0.25s ease; }
      .card-hover:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(224,64,251,0.15); }
      @keyframes pulse-glow {
        0%,100% { box-shadow:0 0 20px rgba(224,64,251,0.3); }
        50% { box-shadow:0 0 50px rgba(224,64,251,0.7),0 0 100px rgba(224,64,251,0.2); }
      }
      @keyframes orbit {
        from { transform:rotate(0deg) translateX(var(--r,110px)) rotate(0deg); }
        to   { transform:rotate(360deg) translateX(var(--r,110px)) rotate(-360deg); }
      }
      @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
      @media (max-width:639px) {
        .hide-mobile { display:none !important; }
        .nav-links { display:none !important; }
      }
      @media (max-width:1023px) {
        .hide-tablet { display:none !important; }
      }
    `
    document.head.appendChild(el)
    return () => document.head.removeChild(el)
  }, [])
  return null
}

/* ─── CUSTOM CURSOR ─── */
const Cursor = () => {
  const dot = useRef(null)
  const ring = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const {isMobile} = useBreakpoint()

  useEffect(() => {
    if (isMobile) return
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dot.current) {
        dot.current.style.left = e.clientX + 'px'
        dot.current.style.top = e.clientY + 'px'
      }
    }
    window.addEventListener('mousemove', move)
    let raf
    const animate = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12
      if (ring.current) {
        ring.current.style.left = ringPos.current.x + 'px'
        ring.current.style.top = ringPos.current.y + 'px'
      }
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(raf) }
  }, [isMobile])

  if (isMobile) return null
  return (
    <>
      <div ref={dot} style={{
        position: 'fixed', width: 8, height: 8, borderRadius: '50%',
        background: C.accent, pointerEvents: 'none', zIndex: 9999,
        transform: 'translate(-50%,-50%)',
        boxShadow: `0 0 10px ${C.accent}`,
      }} />
      <div ref={ring} style={{
        position: 'fixed', width: 36, height: 36, borderRadius: '50%',
        border: `1.5px solid ${C.accent}`, pointerEvents: 'none', zIndex: 9998,
        transform: 'translate(-50%,-50%)', opacity: 0.55,
      }} />
    </>
  )
}
function CountUp({ target, duration = 1500, delay = 1000 }) {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const startTime = performance.now();

      const tick = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out curve
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * target));

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setCount(target);
        }
      };

      rafRef.current = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, delay]);

  return count;
}

/* ─── ANIMATED BACKGROUND ─── */
const AnimatedBackground = () => {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let w = canvas.width = window.innerWidth
    let h = canvas.height = window.innerHeight
    const onResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight }
    window.addEventListener('resize', onResize)
    const count = window.innerWidth < 640 ? 40 : 80
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.3, a: Math.random(),
    }))
    let frame
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const g = ctx.createRadialGradient(w*.3, h*.2, 0, w*.3, h*.2, w*.7)
      g.addColorStop(0,'rgba(224,64,251,0.04)'); g.addColorStop(1,'transparent')
      ctx.fillStyle = g; ctx.fillRect(0,0,w,h)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if(p.x<0||p.x>w) p.vx*=-1; if(p.y<0||p.y>h) p.vy*=-1
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2)
        ctx.fillStyle = `rgba(224,64,251,${p.a*0.4})`; ctx.fill()
      })
      for(let i=0;i<particles.length;i++) for(let j=i+1;j<particles.length;j++){
        const dx=particles[i].x-particles[j].x, dy=particles[i].y-particles[j].y
        const d=Math.sqrt(dx*dx+dy*dy)
        if(d<100){ ctx.beginPath(); ctx.moveTo(particles[i].x,particles[i].y); ctx.lineTo(particles[j].x,particles[j].y)
          ctx.strokeStyle=`rgba(224,64,251,${(1-d/100)*0.07})`; ctx.lineWidth=0.5; ctx.stroke() }
      }
      frame = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', onResize) }
  }, [])
  return <canvas ref={canvasRef} style={{ position:'fixed',top:0,left:0,width:'100%',height:'100%',pointerEvents:'none',zIndex:0 }} />
}

/* ─── NAV ─── */
const Nav = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { isMobile, isTablet } = useBreakpoint()
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  const links = ['About','Skills','Projects','Experience','Education','Contact']
  return (
    <>
      <motion.nav initial={{y:-80,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.8}}
        style={{
          position:'fixed',top:0,left:0,right:0,zIndex:100,
          padding: isMobile ? '0 20px' : '0 40px',
          background: scrolled ? 'rgba(5,7,15,0.94)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? `1px solid ${C.border}` : 'none',
          transition:'all 0.4s ease', display:'flex', alignItems:'center',
          justifyContent:'space-between', height: isMobile ? 60 : 72,
        }}
      >
        <span style={{fontFamily:'Playfair Display',fontSize:isMobile?18:22,fontWeight:700,color:C.white,letterSpacing:1}}>
          JW<span style={{color:C.accent}}>.</span>
        </span>
        {/* Desktop links */}
        {!isMobile && (
          <div style={{display:'flex',gap: isTablet ? 24 : 36}} className="nav-links">
            {links.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`}
                style={{color:C.muted,textDecoration:'none',fontSize:13,textTransform:'uppercase',letterSpacing:2,fontWeight:500,transition:'color 0.2s'}}
                onMouseEnter={e=>e.target.style.color=C.accent}
                onMouseLeave={e=>e.target.style.color=C.muted}
              >{l}</a>
            ))}
          </div>
        )}
        {!isMobile ? (
          <a href="mailto:jessicawilson192004@gmail.com" style={{
            background:`linear-gradient(135deg,${C.accent},#FF6B9D)`,color:C.white,
            padding:'10px 24px',borderRadius:100,textDecoration:'none',fontSize:13,
            fontWeight:700,letterSpacing:1,textTransform:'uppercase',
            boxShadow:`0 0 20px ${C.accentGlow}`,whiteSpace:'nowrap'
          }}>Hire Me</a>
        ) : (
          <button onClick={()=>setMenuOpen(!menuOpen)}
            style={{background:'transparent',border:'none',color:C.text,cursor:'pointer',padding:8}}>
            {menuOpen ? <X size={24}/> : <Menu size={24}/>}
          </button>
        )}
      </motion.nav>
      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && isMobile && (
          <motion.div initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}}
            style={{
              position:'fixed',top:60,left:0,right:0,zIndex:99,
              background:'rgba(5,7,15,0.97)',backdropFilter:'blur(20px)',
              borderBottom:`1px solid ${C.border}`,padding:'20px 20px 28px',
              display:'flex',flexDirection:'column',gap:8,
            }}>
            {links.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`}
                onClick={()=>setMenuOpen(false)}
                style={{
                  color:C.text,textDecoration:'none',fontSize:16,fontWeight:600,
                  padding:'12px 16px',borderRadius:12,letterSpacing:1,
                  border:`1px solid rgba(255,255,255,0.04)`,
                  display:'flex',alignItems:'center',justifyContent:'space-between',
                }}
              >{l} <ChevronRight size={16} color={C.accent}/></a>
            ))}
            <a href="mailto:jessicawilson192004@gmail.com"
              style={{
                background:`linear-gradient(135deg,${C.accent},#FF6B9D)`,color:C.white,
                padding:'14px 24px',borderRadius:100,textDecoration:'none',fontSize:15,
                fontWeight:700,textAlign:'center',marginTop:8,
              }}>Hire Me</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ─── HERO ─── */
const Hero = () => {
  const { isMobile, isTablet, w } = useBreakpoint()
  const [typed, setTyped] = useState('')
  const roles = ['Digital Marketing Specialist','SEO Strategist','Social Media Expert','Growth Marketer']
  const [roleIdx, setRoleIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  useEffect(() => {
    const cur = roles[roleIdx]
    if(!deleting && typed.length < cur.length){
      const t = setTimeout(()=>setTyped(cur.slice(0,typed.length+1)),70); return()=>clearTimeout(t)
    } else if(!deleting && typed.length===cur.length){
      const t = setTimeout(()=>setDeleting(true),2200); return()=>clearTimeout(t)
    } else if(deleting && typed.length>0){
      const t = setTimeout(()=>setTyped(typed.slice(0,-1)),40); return()=>clearTimeout(t)
    } else if(deleting && typed.length===0){
      setDeleting(false); setRoleIdx((roleIdx+1)%roles.length)
    }
  },[typed,deleting,roleIdx])

  const px = isMobile ? '20px' : isTablet ? '40px' : '60px'
  const ringSize = isMobile ? 220 : isTablet ? 300 : 400
  const orbitR = isMobile ? 80 : isTablet ? 110 : 140

  return (
    <section id="hero" style={{
      minHeight:'100vh',display:'flex',alignItems:'center',
      padding: isMobile ? '80px 20px 120px' : isTablet ? '100px 40px 80px' : '100px 60px 60px',
      position:'relative',overflow:'hidden',
    }}>
      {/* Portrait ring - right side desktop/tablet, behind content mobile */}
      <div style={{
        position: isMobile ? 'absolute' : 'absolute',
        right: isMobile ? '50%' : isTablet ? '3%' : '6%',
        top: isMobile ? '12%' : '50%',
        transform: isMobile ? 'translateX(50%)' : 'translateY(-50%)',
        width: ringSize, height: ringSize,
        opacity: isMobile ? 0.18 : 1,
        zIndex: isMobile ? 0 : 1,
        flexShrink:0,
      }}>
        <div style={{
          width:'100%',height:'100%',borderRadius:'50%',
          border:'1px solid rgba(224,64,251,0.1)',
          display:'flex',alignItems:'center',justifyContent:'center',position:'relative',
        }}>
          <div style={{
            width:'80%',height:'80%',borderRadius:'50%',
            border:'1px solid rgba(224,64,251,0.15)',
            display:'flex',alignItems:'center',justifyContent:'center',
            animation:'pulse-glow 4s ease-in-out infinite',
          }}>
            <div style={{
              width:'90%',height:'85%',borderRadius:'80%',
              background:`radial-gradient(circle,rgba(224,64,251,0.12) 0%,transparent 70%)`,
              border:`2px solid ${C.accent}`,
              display:'flex',alignItems:'center',justifyContent:'center',
              flexDirection:'column',gap:6,overflow:'hidden',
            }}>
              <User size={isMobile?32:48} color={C.accent} strokeWidth={1}/>
              <span style={{color:C.muted,fontSize:9,textAlign:'center',lineHeight:1.4,padding:'0 12px'}}>
                <img src={pic1} alt="" srcset="" />
              </span>
            </div>
          </div>
          <div style={{
            position:'absolute',width:10,height:10,borderRadius:'50%',
            background:C.accent,boxShadow:`0 0 12px ${C.accent}`,
            ['--r']:orbitR+'px',animation:'orbit 6s linear infinite',
          }}/>
          <div style={{
            position:'absolute',width:7,height:7,borderRadius:'50%',
            background:C.gold,boxShadow:`0 0 10px ${C.gold}`,
            ['--r']:(orbitR*0.7)+'px',animation:'orbit 9s linear infinite reverse',
          }}/>
        </div>
      </div>

      {/* Content */}
      <div style={{maxWidth: isMobile ? '100%' : isTablet ? 520 : 680,position:'relative',zIndex:1}}>
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.2}}
          style={{display:'inline-flex',alignItems:'center',gap:8,background:C.accentDim,
            border:`1px solid rgba(224,64,251,0.3)`,padding:'6px 16px',borderRadius:100,marginBottom:isMobile?20:28}}>
          <span style={{width:6,height:6,borderRadius:'50%',background:'#4ADE80',boxShadow:'0 0 8px #4ADE80',display:'block'}}/>
          <span style={{color:C.accent,fontSize:11,fontWeight:700,letterSpacing:2,textTransform:'uppercase'}}>Available for hire</span>
        </motion.div>

        <motion.h1 initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{delay:0.35}}
          style={{fontFamily:'Playfair Display',fontSize:`clamp(2.6rem,${isMobile?'12vw':'6vw'},6rem)`,
            fontWeight:900,lineHeight:1.05,marginBottom:16}}>
          <span style={{color:C.white}}>Jessica</span><br/>
          <span className="gradient-text">Wilson</span>
        </motion.h1>

        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.5}}
          style={{fontSize:`clamp(0.95rem,${isMobile?'4vw':'2vw'},1.5rem)`,fontWeight:500,
            marginBottom:20,minHeight:40,display:'flex',alignItems:'center'}}>
          <span style={{color:C.accent}}>{typed}</span>
          <span style={{color:C.accent,animation:'blink 1s step-end infinite',marginLeft:2}}>|</span>
        </motion.div>

        <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.6}}
          style={{color:C.muted,fontSize:isMobile?14:16,lineHeight:1.8,maxWidth:520,marginBottom:isMobile?28:40}}>
          Based in Dubai, UAE — experienced in SEO, Social Media Marketing, Paid Advertising, and Lead Generation. Helping brands grow their digital presence with measurable results.
        </motion.p>

        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.75}}
          style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:isMobile?32:48}}>
          <a href="mailto:jessicawilson192004@gmail.com" style={{
            display:'inline-flex',alignItems:'center',gap:8,
            background:`linear-gradient(135deg,${C.accent},#FF6B9D)`,
            color:C.white,padding:isMobile?'12px 22px':'14px 32px',borderRadius:100,
            textDecoration:'none',fontWeight:700,fontSize:isMobile?13:14,letterSpacing:1,
            boxShadow:`0 0 30px ${C.accentGlow}`,
          }}>
            <Mail size={15}/> Get In Touch
          </a>
          <a href="#projects" style={{
            display:'inline-flex',alignItems:'center',gap:8,
            border:`1.5px solid rgba(224,64,251,0.4)`,
            color:C.text,padding:isMobile?'12px 22px':'14px 32px',borderRadius:100,
            textDecoration:'none',fontWeight:600,fontSize:isMobile?13:14,letterSpacing:1,
          }}>
            View Projects <ArrowUpRight size={15}/>
          </a>
        </motion.div>

        <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1 }}
  style={{ display: "flex", gap: isMobile ? 20 : 36, flexWrap: "wrap" }}
>
  {[
    { n: 2, suffix: "+", l: "Years Exp." },
    { n: 35, suffix: "+", l: "Certifications" },
    { n: 15, suffix: "+", l: "Clients" },
  ].map(({ n, suffix, l }) => (
    <div key={l}>
      <div
        style={{
          fontFamily: "Playfair Display",
          fontSize: isMobile ? 22 : 28,
          fontWeight: 900,
          color: C.white,
        }}
      >
        <CountUp target={n} duration={2500} delay={1000} />
        {suffix}
      </div>
      <div
        style={{
          color: C.muted,
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: 1.5,
        }}
      >
        {l}
      </div>
    </div>
  ))}
</motion.div>
      </div>

      {/* Bottom contact strip - hide on mobile */}
      {!isMobile && (
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:1.1}}
          style={{position:'absolute',bottom:28,left:px,right:px,display:'flex',gap:24,flexWrap:'wrap'}}>
          {[{icon:<MapPin size={13}/>,text:'Dubai, UAE'},{icon:<Mail size={13}/>,text:'jessicawilson192004@gmail.com'},{icon:<Phone size={13}/>,text:'+971 589548998'}].map(({icon,text})=>(
            <span key={text} style={{display:'flex',alignItems:'center',gap:6,color:C.muted,fontSize:13}}>{icon}{text}</span>
          ))}
        </motion.div>
      )}
    </section>
  )
}

/* ─── ABOUT ─── */
const About = () => {
  const { isMobile, isTablet } = useBreakpoint()
  return (
    <section id="about" style={{padding: isMobile?'70px 20px':isTablet?'80px 40px':'100px 60px',position:'relative',zIndex:1}}>
      <div style={{maxWidth:1100,margin:'0 auto',display:'grid',
        gridTemplateColumns: isMobile||isTablet ? '1fr' : '1fr 1fr',
        gap: isMobile?40:isTablet?48:80,alignItems:'center'}}>
        <motion.div initial={{opacity:0,x:isMobile?0:-60,y:isMobile?30:0}} whileInView={{opacity:1,x:0,y:0}}
          viewport={{once:true}} transition={{duration:0.8}}>
          <div style={{
            position:'relative',width:'100%',
            maxWidth: isMobile ? 300 : isTablet ? 380 : '100%',
            margin: isMobile||isTablet ? '0 auto' : 0,
            aspectRatio:'4/5',borderRadius:32,overflow:'hidden',
            background:`linear-gradient(135deg,rgba(224,64,251,0.1),rgba(255,107,157,0.08))`,
            border:`1px solid rgba(224,64,251,0.2)`,
          }}>
            <div style={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:16}}>
              
              <p style={{color:C.muted,fontSize:13,textAlign:'center',padding:'0 24px',lineHeight:1.6}}>
                <img src={pic2} alt="" srcset="" /><br/>
                <span style={{fontSize:11,opacity:0.6}}>Replace with an &lt;img&gt; tag</span>
              </p>
            </div>
            <div style={{
              position:'absolute',bottom:16,left:16,right:16,
              background:'rgba(5,7,15,0.88)',backdropFilter:'blur(10px)',
              borderRadius:16,padding:'14px 18px',border:`1px solid rgba(224,64,251,0.25)`,
            }}>
              <div style={{fontFamily:'Playfair Display',fontSize:16,fontWeight:700,color:C.white}}>Jessica Wilson</div>
              <div style={{color:C.accent,fontSize:12,marginTop:2}}>Digital Marketing Specialist</div>
            </div>
          </div>
        </motion.div>
        <motion.div initial={{opacity:0,x:isMobile?0:60,y:isMobile?30:0}} whileInView={{opacity:1,x:0,y:0}}
          viewport={{once:true}} transition={{duration:0.8}}>
          <div style={{color:C.accent,fontSize:11,fontWeight:700,letterSpacing:3,textTransform:'uppercase',marginBottom:14}}>About Me</div>
          <h2 style={{fontFamily:'Playfair Display',fontSize:`clamp(1.8rem,4vw,3.2rem)`,fontWeight:900,lineHeight:1.15,color:C.white,marginBottom:20}}>
            Driving Growth Through <span className="gradient-text">Digital Excellence</span>
          </h2>
          <p style={{color:C.muted,fontSize:isMobile?14:16,lineHeight:1.9,marginBottom:16}}>
            Motivated Digital Marketer with a Bachelor of Commerce in Computer Applications, certified training in Digital Marketing, and currently pursuing an MBA in Marketing.
          </p>
          <p style={{color:C.muted,fontSize:isMobile?14:16,lineHeight:1.9,marginBottom:32}}>
            With hands-on experience in social media management, SEO, paid advertising, and lead generation, I help businesses stand out and grow their digital presence in competitive markets. Languages: English, Malayalam.
          </p>
          <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
            <a href="mailto:jessicawilson192004@gmail.com" style={{
              display:'inline-flex',alignItems:'center',gap:8,
              background:`linear-gradient(135deg,${C.accent},#FF6B9D)`,
              color:C.white,padding:'12px 24px',borderRadius:100,textDecoration:'none',fontWeight:700,fontSize:14,
            }}><Mail size={14}/>Contact Me</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{
              display:'inline-flex',alignItems:'center',gap:8,
              border:`1.5px solid rgba(224,64,251,0.4)`,
              color:C.text,padding:'12px 24px',borderRadius:100,textDecoration:'none',fontWeight:600,fontSize:14,
            }}><Linkedin size={14}/>LinkedIn</a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── SKILLS ─── */
const skillsData = [
  {icon:<Search size={20}/>,name:'SEO',desc:'On-Page, Keyword Research, Site Audits via Semrush',level:90},
  {icon:<Share2 size={20}/>,name:'Social Media Marketing',desc:'Meta, Instagram, LinkedIn Strategy & Campaigns',level:88},
  {icon:<Target size={20}/>,name:'Search Engine Marketing',desc:'Google Ads Search, Display, Search Ads 360',level:85},
  {icon:<TrendingUp size={20}/>,name:'Lead Generation',desc:'Meta Leads, Campaign Optimisation,Google Ads ',level:86},
  {icon:<BarChart2 size={20}/>,name:'Data Analysis',desc:'Google Analytics, Campaign Manager 360',level:82},
  {icon:<Megaphone size={20}/>,name:'Content Marketing',desc:'Content Strategy, Calendars & Brand Identity',level:84},
]

const SkillBar = ({skill,i}) => {
  const [inView,setInView] = useState(false)
  const ref = useRef(null)
  const {isMobile} = useBreakpoint()
  useEffect(()=>{
    const obs = new IntersectionObserver(([e])=>{if(e.isIntersecting)setInView(true)},{threshold:0.3})
    if(ref.current) obs.observe(ref.current)
    return()=>obs.disconnect()
  },[])
  return (
    <motion.div ref={ref} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}}
      viewport={{once:true}} transition={{delay:i*0.08}}
      className="glow-border card-hover"
      style={{background:C.surface,borderRadius:20,padding:isMobile?'18px 18px':'22px 24px'}}>
      <div style={{display:'flex',alignItems:'flex-start',gap:12,marginBottom:16}}>
        <div style={{
          width:44,height:44,borderRadius:12,background:C.accentDim,
          border:`1px solid rgba(224,64,251,0.3)`,display:'flex',alignItems:'center',justifyContent:'center',
          color:C.accent,flexShrink:0,
        }}>{skill.icon}</div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontWeight:700,fontSize:isMobile?14:15,color:C.white,marginBottom:3}}>{skill.name}</div>
          <div style={{color:C.muted,fontSize:12,lineHeight:1.4}}>{skill.desc}</div>
        </div>
        <div style={{fontFamily:'Playfair Display',fontSize:18,fontWeight:700,color:C.accent,flexShrink:0}}>{skill.level}%</div>
      </div>
      <div style={{height:3,background:'rgba(255,255,255,0.06)',borderRadius:99,overflow:'hidden'}}>
        <motion.div initial={{width:0}} animate={{width:inView?`${skill.level}%`:0}}
          transition={{duration:1.2,delay:i*0.08+0.3,ease:[0.25,0.1,0.25,1]}}
          style={{height:'100%',borderRadius:99,background:`linear-gradient(90deg,${C.accent},#FFD166)`}}/>
      </div>
    </motion.div>
  )
}

const Skills = () => {
  const {isMobile,isTablet} = useBreakpoint()
  return (
    <section id="skills" style={{padding:isMobile?'70px 20px':isTablet?'80px 40px':'100px 60px',position:'relative',zIndex:1}}>
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
          style={{textAlign:'center',marginBottom:isMobile?40:56}}>
          <div style={{color:C.accent,fontSize:11,fontWeight:700,letterSpacing:3,textTransform:'uppercase',marginBottom:10}}>Expertise</div>
          <h2 style={{fontFamily:'Playfair Display',fontSize:`clamp(2rem,5vw,3.8rem)`,fontWeight:900,color:C.white}}>
            Core <span className="gradient-text">Skills</span>
          </h2>
        </motion.div>
        <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr':'repeat(auto-fit,minmax(300px,1fr))',gap:20}}>
          {skillsData.map((s,i)=><SkillBar key={s.name} skill={s} i={i}/>)}
        </div>
        {/* Certifications */}
        <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
          transition={{delay:0.3}} style={{marginTop:56}}>
          <h3 style={{fontFamily:'Playfair Display',fontSize:isMobile?22:26,fontWeight:700,color:C.white,marginBottom:24,textAlign:'center'}}>
            Certifications
          </h3>
          <div style={{display:'flex',flexWrap:'wrap',gap:10,justifyContent:'center'}}>
            {['LinkedIn Advertising Fundamentals','LinkedIn Marketing Strategy','HubSpot Social Media Certified','HubSpot Content Marketing Certified',
              'HubSpot Digital Advertising Certified','On Page SEO – Semrush','SEO Essentials – Semrush','Keyword Research – Semrush',
              'Search Ads 360 Certified','Campaign Manager 360','Google Analytics Certified','Google Ads Display & Search Certified',
            ].map(cert=>(
              <span key={cert} style={{
                display:'inline-flex',alignItems:'center',gap:6,
                background:C.accentDim,border:`1px solid rgba(224,64,251,0.22)`,
                color:C.text,padding:'7px 14px',borderRadius:100,fontSize:isMobile?11:12,fontWeight:500,
              }}>
                <Award size={11} color={C.accent}/>{cert}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── PROJECTS ─── */
const projectsData = [
  {
    num:'01', title:'SEO Campaign — Windsor Castle', client:'Bluepin Digital',
    category:'Search Engine Optimisation',
    desc:'Full site audit, competitor analysis, and keyword research to identify growth opportunities for Windsor Castle in Kottayam. Delivered an actionable strategy that improved organic discoverability.',
    results:[{icon:<Search size={16}/>,stat:'+40%',label:'Organic Visibility'},{icon:<TrendingUp size={16}/>,stat:'Top 3',label:'Target Keywords'},{icon:<BarChart size={16}/>,stat:'2x',label:'Traffic Increase'}],
    tags:['SEO','Keyword Research','Site Audit','Competitor Analysis'],
    color:'#E040FB',
  },
  {
    num:'02', title:'Meta Lead Generation — Shajina Medical', client:'Bluepin Digital',
    category:'Paid Advertising · Lead Generation',
    desc:'Planned and executed live Meta (Facebook/Instagram) lead generation campaigns for Shajina Medical Center. Managed targeting, creative strategy, and budget to maximise qualified leads.',
    results:[{icon:<Users size={16}/>,stat:'3x',label:'Lead Volume'},{icon:<Target size={16}/>,stat:'-35%',label:'Cost Per Lead'},{icon:<Zap size={16}/>,stat:'Live',label:'Campaign Management'}],
    tags:['Meta Ads','Lead Gen','Facebook','Instagram','Campaign Optimisation'],
    color:'#FF6B9D',
  },
  {
    num:'03', title:'Google Ads SEM — Shajina Medical', client:'Bluepin Digital',
    category:'Search Engine Marketing',
    desc:'Gained hands-on SEM experience managing and running Google Ads search campaigns. Conducted live search ads strategy and optimisation, driving intent-based traffic and patient inquiries.',
    results:[{icon:<Search size={16}/>,stat:'Live',label:'Search Ads'},{icon:<BarChart2 size={16}/>,stat:'+55%',label:'Click-Through Rate'},{icon:<Target size={16}/>,stat:'High',label:'Quality Score'}],
    tags:['Google Ads','SEM','Search Campaigns','PPC'],
    color:'#FFD166',
  },
  {
    num:'04', title:'Brand & Social Strategy — Samra FM Dubai', client:'Samra FM Dubai',
    category:'Social Media · Branding',
    desc:'Managed and supported digital marketing activities for facilities management services in Dubai. Created lead-focused social media content, brand visibility initiatives, and content planning strategy.',
    results:[{icon:<Share2 size={16}/>,stat:'↑',label:'Brand Reach'},{icon:<Globe size={16}/>,stat:'Dubai',label:'Market'},{icon:<Megaphone size={16}/>,stat:'B2B',label:'Lead Focus'}],
    tags:['Social Media','Content Strategy','Brand Visibility','B2B Marketing'],
    color:'#4ADE80',
  },
]

const Projects = () => {
  const {isMobile,isTablet} = useBreakpoint()
  return (
    <section id="projects" style={{padding:isMobile?'70px 20px':isTablet?'80px 40px':'100px 60px',position:'relative',zIndex:1}}>
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
          style={{textAlign:'center',marginBottom:isMobile?40:64}}>
          <div style={{color:C.accent,fontSize:11,fontWeight:700,letterSpacing:3,textTransform:'uppercase',marginBottom:10}}>Portfolio</div>
          <h2 style={{fontFamily:'Playfair Display',fontSize:`clamp(2rem,5vw,3.8rem)`,fontWeight:900,color:C.white}}>
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p style={{color:C.muted,fontSize:isMobile?14:16,marginTop:16,maxWidth:520,margin:'16px auto 0'}}>
            Real campaigns and strategies delivered for clients across healthcare, hospitality, and facilities management.
          </p>
        </motion.div>

        <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr':isTablet?'1fr':'1fr 1fr',gap:isMobile?20:24}}>
          {projectsData.map((p,i)=>(
            <motion.div key={p.num}
              initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}}
              viewport={{once:true}} transition={{delay:i*0.1}}
              className="card-hover"
              style={{
                background:C.surface,borderRadius:isMobile?20:28,
                border:`1px solid rgba(255,255,255,0.06)`,
                overflow:'hidden',position:'relative',
              }}
            >
              {/* Top colour bar */}
              <div style={{height:3,background:`linear-gradient(90deg,${p.color},transparent)`}}/>
              <div style={{padding:isMobile?'20px 20px 24px':'28px 28px 32px'}}>
                {/* Header */}
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:16,gap:12}}>
                  <div>
                    <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
                      <span style={{
                        fontFamily:'Playfair Display',fontSize:isMobile?28:36,fontWeight:900,
                        color:p.color,opacity:0.25,lineHeight:1,
                      }}>{p.num}</span>
                      <span style={{
                        background:`${p.color}18`,color:p.color,
                        padding:'4px 12px',borderRadius:100,fontSize:11,fontWeight:700,
                        border:`1px solid ${p.color}30`,textTransform:'uppercase',letterSpacing:1,
                        whiteSpace:'nowrap',
                      }}>{p.category}</span>
                    </div>
                    <h3 style={{fontFamily:'Playfair Display',fontSize:isMobile?17:20,fontWeight:700,color:C.white,lineHeight:1.3}}>
                      {p.title}
                    </h3>
                    <div style={{color:C.muted,fontSize:12,marginTop:4}}>Client: {p.client}</div>
                  </div>
                </div>

                <p style={{color:C.muted,fontSize:isMobile?13:14,lineHeight:1.75,marginBottom:20}}>
                  {p.desc}
                </p>

                {/* Results */}
                <div style={{
                  display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10,
                  background:'rgba(255,255,255,0.025)',borderRadius:16,
                  padding:isMobile?'14px 12px':'18px 16px',marginBottom:20,
                  border:`1px solid rgba(255,255,255,0.04)`,
                }}>
                  {p.results.map(r=>(
                    <div key={r.label} style={{textAlign:'center'}}>
                      <div style={{color:p.color,marginBottom:4,display:'flex',justifyContent:'center'}}>{r.icon}</div>
                      <div style={{fontFamily:'Playfair Display',fontSize:isMobile?18:22,fontWeight:900,color:C.white,lineHeight:1}}>{r.stat}</div>
                      <div style={{color:C.muted,fontSize:10,marginTop:3,textTransform:'uppercase',letterSpacing:0.5}}>{r.label}</div>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div style={{display:'flex',flexWrap:'wrap',gap:7}}>
                  {p.tags.map(t=>(
                    <span key={t} style={{
                      background:'rgba(255,255,255,0.04)',color:C.muted,
                      padding:'5px 12px',borderRadius:100,fontSize:11,
                      border:`1px solid rgba(255,255,255,0.07)`,
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── EXPERIENCE ─── */
const experiences = [
  {
    role:'Digital Marketing Executive', company:'Samra FM Dubai',
    period:'Dec 2025 – Jan 2026', type:'Full-Time',
    bullets:[
      'Managed digital marketing activities for facilities management services',
      'Created lead-focused social media content and brand visibility initiatives',
      'Supported overall digital strategy with content planning and performance tracking',
    ],
    tags:['Social Media','Content Strategy','Brand Visibility'],
  },
  {
    role:'Digital Marketing Executive', company:'Bluepin Digital, Trivandrum',
    period:'May 2025 – Nov 2025', type:'Internship',
    bullets:[
      'Conducted site audit, competitor analysis & keyword research (SEO) for Windsor Castle, Kottayam',
      'Created social media plan, content calendar & campaigns (SMM)',
      'Developed and presented brand concept showcasing expertise in branding & content strategy',
      'Successfully managed live Meta leads campaigns for Shajina Medical Center',
      'Gained hands-on SEM experience managing Google Ads & live search ads',
    ],
    tags:['SEO','Meta Ads','Google Ads','Content Calendar','Branding'],
  },
]

const Experience = () => {
  const {isMobile,isTablet} = useBreakpoint()
  return (
    <section id="experience" style={{padding:isMobile?'70px 20px':isTablet?'80px 40px':'100px 60px',position:'relative',zIndex:1}}>
      <div style={{maxWidth:860,margin:'0 auto'}}>
        <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
          style={{textAlign:'center',marginBottom:isMobile?40:56}}>
          <div style={{color:C.accent,fontSize:11,fontWeight:700,letterSpacing:3,textTransform:'uppercase',marginBottom:10}}>Career</div>
          <h2 style={{fontFamily:'Playfair Display',fontSize:`clamp(2rem,5vw,3.8rem)`,fontWeight:900,color:C.white}}>
            Work <span className="gradient-text">Experience</span>
          </h2>
        </motion.div>
        <div style={{position:'relative'}}>
          <div style={{
            position:'absolute',left:isMobile?10:16,top:0,bottom:0,width:1,
            background:'linear-gradient(to bottom,transparent,rgba(224,64,251,0.4),transparent)',
          }}/>
          {experiences.map((exp,i)=>(
            <motion.div key={i} initial={{opacity:0,x:-40}} whileInView={{opacity:1,x:0}}
              viewport={{once:true}} transition={{delay:i*0.15}}
              style={{paddingLeft:isMobile?36:52,marginBottom:36,position:'relative'}}>
              <div style={{
                position:'absolute',left:isMobile?3:9,top:22,
                width:16,height:16,borderRadius:'50%',
                background:C.accent,boxShadow:`0 0 14px ${C.accent}`,
                border:`3px solid ${C.bg}`,
              }}/>
              <div className="glow-border" style={{background:C.surface,borderRadius:isMobile?18:22,padding:isMobile?'20px 18px':'28px 32px'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:10,marginBottom:8}}>
                  <div>
                    <h3 style={{fontFamily:'Playfair Display',fontSize:isMobile?18:21,fontWeight:700,color:C.white,marginBottom:3}}>{exp.role}</h3>
                    <div style={{color:C.accent,fontWeight:600,fontSize:isMobile?13:15}}>{exp.company}</div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div style={{color:C.muted,fontSize:12,marginBottom:5}}>{exp.period}</div>
                    <span style={{
                      background:C.accentDim,color:C.accent,padding:'3px 12px',borderRadius:100,
                      fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:1,
                      border:`1px solid rgba(224,64,251,0.3)`,
                    }}>{exp.type}</span>
                  </div>
                </div>
                <ul style={{marginTop:16,paddingLeft:0,listStyle:'none'}}>
                  {exp.bullets.map((b,j)=>(
                    <li key={j} style={{display:'flex',gap:10,marginBottom:8,alignItems:'flex-start'}}>
                      <div style={{width:5,height:5,borderRadius:'50%',background:C.accent,marginTop:8,flexShrink:0}}/>
                      <span style={{color:C.muted,fontSize:isMobile?13:14,lineHeight:1.7}}>{b}</span>
                    </li>
                  ))}
                </ul>
                <div style={{display:'flex',flexWrap:'wrap',gap:7,marginTop:16}}>
                  {exp.tags.map(t=>(
                    <span key={t} style={{
                      background:'rgba(255,255,255,0.04)',color:C.text,
                      padding:'4px 12px',borderRadius:100,fontSize:11,
                      border:`1px solid rgba(255,255,255,0.07)`,
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── EDUCATION ─── */
const educationData = [
  {degree:'Master of Business Administration (Marketing)',school:'Amrita Vishwa Vidhyapeetham (AHEAD online)',year:'2025 – Present',icon:'🎓'},
  {degree:'Advance Diploma in Digital Marketing (ADDMC)',school:'Digitalx Marketers Academy',year:'2025',icon:'🎓'},
  {degree:'B.Com in Computer Application',school:'University of Kerala',year:'2022 – 2025',icon:'🎓'},
  {degree:'Diploma in Indian and Foreign Accounting (DIFA)',school:'G-Tec Computer Education',year:'2025',icon:'📊'},
]

const Education = () => {
  const {isMobile,isTablet} = useBreakpoint()
  return (
    <section id="education" style={{padding:isMobile?'70px 20px':isTablet?'80px 40px':'100px 60px',position:'relative',zIndex:1}}>
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
          style={{textAlign:'center',marginBottom:isMobile?40:56}}>
          <div style={{color:C.accent,fontSize:11,fontWeight:700,letterSpacing:3,textTransform:'uppercase',marginBottom:10}}>Background</div>
          <h2 style={{fontFamily:'Playfair Display',fontSize:`clamp(2rem,5vw,3.8rem)`,fontWeight:900,color:C.white}}>
            <span className="gradient-text">Education</span>
          </h2>
        </motion.div>
        <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr':isTablet?'1fr 1fr':'repeat(4,1fr)',gap:isMobile?16:20}}>
          {educationData.map((e,i)=>(
            <motion.div key={i} initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}}
              viewport={{once:true}} transition={{delay:i*0.1}}
              className="glow-border card-hover"
              style={{background:C.surface,borderRadius:isMobile?18:22,padding:isMobile?'22px 18px':'28px 24px',cursor:'default'}}>
              <div style={{fontSize:32,marginBottom:16}}>{e.icon}</div>
              <div style={{color:C.accent,fontSize:11,fontWeight:700,letterSpacing:2,textTransform:'uppercase',marginBottom:8}}>{e.year}</div>
              <h3 style={{fontFamily:'Playfair Display',fontSize:isMobile?15:17,fontWeight:700,color:C.white,lineHeight:1.4,marginBottom:8}}>{e.degree}</h3>
              <p style={{color:C.muted,fontSize:13}}>{e.school}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── CONTACT ─── */
const Contact = () => {
  const {isMobile,isTablet} = useBreakpoint()
  return (
    <section id="contact" style={{padding:isMobile?'70px 20px 50px':isTablet?'80px 40px 50px':'100px 60px 60px',position:'relative',zIndex:1}}>
      <div style={{maxWidth:680,margin:'0 auto',textAlign:'center'}}>
        <motion.div initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
          <div style={{color:C.accent,fontSize:11,fontWeight:700,letterSpacing:3,textTransform:'uppercase',marginBottom:14}}>Get In Touch</div>
          <h2 style={{fontFamily:'Playfair Display',fontSize:`clamp(2.2rem,6vw,4.5rem)`,fontWeight:900,color:C.white,lineHeight:1.1,marginBottom:20}}>
            Let&apos;s Work <span className="gradient-text">Together</span>
          </h2>
          <p style={{color:C.muted,fontSize:isMobile?14:16,lineHeight:1.8,marginBottom:40}}>
            Open to new opportunities and exciting projects. Whether you need an SEO audit, social media strategy, or a full digital marketing campaign — let&apos;s connect.
          </p>
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            {[
              {icon:<Mail size={18}/>,label:'Email',value:'jessicawilson192004@gmail.com',href:'mailto:jessicawilson192004@gmail.com'},
              {icon:<Phone size={18}/>,label:'Phone',value:'+971 589 548 998',href:'tel:+971589548998'},
              {icon:<MapPin size={18}/>,label:'Location',value:'Dubai, UAE',href:'#'},
            ].map(({icon,label,value,href})=>(
              <a key={label} href={href} style={{
                display:'flex',alignItems:'center',gap:14,
                background:C.surface,borderRadius:isMobile?14:18,padding:isMobile?'16px 18px':'18px 28px',
                textDecoration:'none',color:C.text,
                border:`1px solid rgba(224,64,251,0.12)`,transition:'all 0.2s',
              }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(224,64,251,0.4)';e.currentTarget.style.transform='translateX(4px)'}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(224,64,251,0.12)';e.currentTarget.style.transform='translateX(0)'}}
              >
                <span style={{color:C.accent,flexShrink:0}}>{icon}</span>
                <span style={{flex:1,textAlign:'left'}}>
                  <div style={{fontSize:10,color:C.muted,textTransform:'uppercase',letterSpacing:1.5,marginBottom:2}}>{label}</div>
                  <div style={{fontSize:isMobile?13:15,fontWeight:500,wordBreak:'break-all'}}>{value}</div>
                </span>
                <ExternalLink size={14} color={C.muted} style={{flexShrink:0}}/>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
      {/* Footer */}
      <motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}}
        style={{
          maxWidth:1100,margin:'60px auto 0',paddingTop:28,
          borderTop:`1px solid ${C.border}`,
          display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12,
        }}>
        <span style={{fontFamily:'Playfair Display',fontSize:18,fontWeight:700,color:C.white}}>
          JW<span style={{color:C.accent}}>.</span>
        </span>
        <span style={{color:C.muted,fontSize:12}}>© 2026 Jessica Wilson · Digital Marketing Specialist · Dubai, UAE</span>
      </motion.div>
    </section>
  )
}

/* ─── APP ─── */
export default function App() {
  return (
    <>
      <GlobalStyle/>
      <AnimatedBackground/>
      <Cursor/>
      <div style={{position:'relative',zIndex:1}}>
        <Nav/>
        <Hero/>
        <About/>
        <Skills/>
        <Projects/>
        <Experience/>
        <Education/>
        <Contact/>
      </div>
    </>
  )
}
