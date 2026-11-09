import React, { useMemo, useState } from "react";
import {
  Menu, X, Phone, Globe, CalendarDays, ChevronRight, ChevronLeft,
  Home, Calculator, MapPin, BedDouble, Bath, CheckCircle2, ArrowRight,
  ShieldCheck, TrendingUp, Building2, Sparkles, ExternalLink
} from "lucide-react";

const AGENT = {
  name: "Brian AJ Flatley II",
  team: "Arizona's Family Team",
  brokerage: "eXp Realty",
  phone: "480-703-4846",
  phoneLink: "tel:4807034846",
  website: "https://www.myazfamilyhome.com",
  calendly: "https://calendly.com/brian-1660",
  photo: "/brian.jpg"
};

const money = (value) => new Intl.NumberFormat("en-US", {
  style: "currency", currency: "USD", maximumFractionDigits: 0
}).format(value);

const preciseMoney = (value) => new Intl.NumberFormat("en-US", {
  style: "currency", currency: "USD", maximumFractionDigits: 2
}).format(value);

function AgentPhoto({ className = "" }) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <div className={`flex items-center justify-center bg-slate-800 text-amber-400 ${className}`}>
      <span className="text-3xl font-bold">BF</span>
    </div>
  ) : (
    <img src={AGENT.photo} alt={AGENT.name} onError={() => setFailed(true)}
      className={`object-cover ${className}`} />
  );
}

function BookButton({ children = "Schedule a Consultation", className = "" }) {
  return <a href={AGENT.calendly} target="_blank" rel="noreferrer"
    className={`inline-flex items-center justify-center gap-2 rounded-lg bg-amber-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-amber-300 ${className}`}>
    {children}<ArrowRight size={17} />
  </a>;
}

function SectionTitle({ eyebrow, title, description }) {
  return <div className="mb-10 text-center">
    <p className="mb-3 text-xs font-bold uppercase tracking-[.3em] text-amber-400">{eyebrow}</p>
    <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">{title}</h2>
    {description && <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 md:text-base">{description}</p>}
  </div>;
}

function HomeValuation() {
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState("");
  const [beds, setBeds] = useState("3");
  const [baths, setBaths] = useState("2");
  const [condition, setCondition] = useState("Good Condition");
  const [timeframe, setTimeframe] = useState("1-3 Months");

  const estimate = useMemo(() => {
    const base = 350000;
    const conditionFactor = {
      "Needs TLC": 0.90,
      "Good Condition": 1,
      "Turnkey / Remodeled": 1.09
    }[condition];
    const center = (base + (Number(beds) - 3) * 18000 +
      (Number(baths) - 2) * 12000) * conditionFactor;
    return {
      low: Math.round(center * 0.93 / 1000) * 1000,
      high: Math.round(center * 1.07 / 1000) * 1000,
      average: Math.round(center / 1000) * 1000
    };
  }, [beds, baths, condition]);

  const options = ["Needs TLC", "Good Condition", "Turnkey / Remodeled"];
  const timeOptions = ["ASAP (<30 Days)", "1-3 Months", "Just Curious"];

  return <section id="valuation" className="scroll-mt-28">
    <SectionTitle eyebrow="Know Your Property's Potential" title="What's Your Arizona Home Worth?"
      description="Share a few property details to see an illustrative estimate, then connect with Brian for a personalized Comparative Market Analysis." />
    <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
      <div className="border-b border-slate-800 px-6 py-6 md:px-10">
        <div className="mb-4 flex justify-between text-sm">
          <span className="font-semibold text-white">{step === 3 ? "Your Estimated Value" : `Property Details — Step ${step} of 2`}</span>
          <span className="text-slate-400">{step === 3 ? "Estimate ready" : `${step}/2 completed`}</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
          <div className="h-full rounded-full bg-amber-400 transition-all" style={{ width: `${step === 3 ? 100 : step * 50}%` }} />
        </div>
      </div>
      <div className="p-6 md:p-10">
        {step === 1 && <div className="space-y-7">
          <div>
            <label className="mb-2 block text-sm font-semibold">Property Address</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400" size={19} />
              <input value={address} onChange={e => setAddress(e.target.value)}
                placeholder="Enter your complete property address"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 py-4 pl-12 pr-4 text-white outline-none focus:border-amber-400" />
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-semibold">Bedrooms
              <div className="relative mt-2">
                <BedDouble className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400" size={19} />
                <select value={beds} onChange={e => setBeds(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-slate-700 bg-slate-950 p-4 pl-12 text-white">
                  {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} Bedrooms</option>)}
                </select>
              </div>
            </label>
            <label className="text-sm font-semibold">Bathrooms
              <div className="relative mt-2">
                <Bath className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400" size={19} />
                <select value={baths} onChange={e => setBaths(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-slate-700 bg-slate-950 p-4 pl-12 text-white">
                  {["1","1.5","2","2.5","3","3.5","4","5"].map(n => <option key={n} value={n}>{n} Bathrooms</option>)}
                </select>
              </div>
            </label>
          </div>
          <button disabled={!address.trim()} onClick={() => setStep(2)}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-400 py-4 font-bold text-slate-950 hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-40">
            Continue to Property Details <ChevronRight size={19} />
          </button>
        </div>}

        {step === 2 && <div className="space-y-8">
          <div>
            <p className="mb-4 text-sm font-semibold">How would you describe your property's condition?</p>
            <div className="grid gap-3">
              {options.map(option => <button key={option} onClick={() => setCondition(option)}
                className={`flex items-center justify-between rounded-lg border p-4 text-left ${condition === option ? "border-amber-400 bg-amber-400/10 text-amber-300" : "border-slate-700 bg-slate-950 text-slate-300"}`}>
                {option}{condition === option && <CheckCircle2 size={20} />}
              </button>)}
            </div>
          </div>
          <div>
            <p className="mb-4 text-sm font-semibold">When are you thinking about selling?</p>
            <div className="grid gap-3 sm:grid-cols-3">
              {timeOptions.map(option => <button key={option} onClick={() => setTimeframe(option)}
                className={`rounded-lg border p-3 text-sm font-semibold ${timeframe === option ? "border-amber-400 bg-amber-400/10 text-amber-300" : "border-slate-700 bg-slate-950 text-slate-300"}`}>
                {option}
              </button>)}
            </div>
          </div>
          <div className="flex flex-col-reverse gap-3 sm:flex-row">
            <button onClick={() => setStep(1)} className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-700 py-4 font-semibold"><ChevronLeft size={18}/> Back</button>
            <button onClick={() => setStep(3)} className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-amber-400 py-4 font-bold text-slate-950 hover:bg-amber-300">Calculate My Estimate <ArrowRight size={18}/></button>
          </div>
        </div>}

        {step === 3 && <div className="text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-amber-400/10 text-amber-400"><Home size={32}/></div>
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">Illustrative Estimated Value</p>
          <h3 className="my-4 text-4xl font-extrabold text-amber-400 md:text-5xl">{money(estimate.average)}</h3>
          <div className="grid grid-cols-2 gap-4 rounded-xl border border-slate-700 bg-slate-950 p-5">
            <div><p className="mb-1 text-xs text-slate-400">Estimated Low</p><p className="text-xl font-bold">{money(estimate.low)}</p></div>
            <div><p className="mb-1 text-xs text-slate-400">Estimated High</p><p className="text-xl font-bold">{money(estimate.high)}</p></div>
          </div>
          <div className="my-6 space-y-2 text-left text-sm text-slate-400">
            <p><b className="text-white">Property:</b> {address}</p>
            <p><b className="text-white">Bedrooms:</b> {beds} · <b className="text-white">Bathrooms:</b> {baths}</p>
            <p><b className="text-white">Condition:</b> {condition}</p>
            <p><b className="text-white">Selling timeframe:</b> {timeframe}</p>
          </div>
          <div className="rounded-xl border border-amber-400/30 bg-amber-400/5 p-5 text-left">
            <p className="mb-2 font-bold">Let's determine your home's actual market value.</p>
            <p className="mb-4 text-sm leading-6 text-slate-400">Brian can prepare a personalized CMA using relevant local sales, current competition, property features, and market conditions.</p>
            <BookButton className="w-full">Schedule My Home Valuation</BookButton>
          </div>
          <p className="mt-5 text-xs leading-5 text-slate-500">This is a simulated estimate using a simplified model. It is not an appraisal, live MLS valuation, CMA, or guarantee of sale price.</p>
          <button onClick={() => {setStep(1);setAddress("");setBeds("3");setBaths("2");setCondition("Good Condition");setTimeframe("1-3 Months");}}
            className="mt-5 text-sm font-semibold text-amber-400 hover:text-amber-300">Start a New Valuation</button>
        </div>}
      </div>
    </div>
  </section>;
}

function MortgageCalculator() {
  const [price, setPrice] = useState(450000);
  const [down, setDown] = useState(20);
  const [rate, setRate] = useState(6.5);
  const [term, setTerm] = useState(30);
  const [hoa, setHoa] = useState(100);

  const calc = useMemo(() => {
    const downPayment = price * down / 100;
    const principal = price - downPayment;
    const monthlyRate = rate / 100 / 12;
    const months = term * 12;
    const pi = monthlyRate === 0 ? principal / months :
      principal * monthlyRate * Math.pow(1 + monthlyRate, months) /
      (Math.pow(1 + monthlyRate, months) - 1);
    const taxes = price * 0.006 / 12;
    const insurance = price * 0.0035 / 12;
    return { downPayment, principal, pi, taxes, insurance, hoa, total: pi + taxes + insurance + hoa };
  }, [price, down, rate, term, hoa]);

  const items = [
    ["Principal & Interest", calc.pi, "bg-amber-400"],
    ["Property Taxes", calc.taxes, "bg-blue-400"],
    ["Home Insurance", calc.insurance, "bg-indigo-400"],
    ["HOA", calc.hoa, "bg-slate-500"]
  ];

  return <section id="mortgage" className="scroll-mt-28">
    <SectionTitle eyebrow="Plan Your Next Move" title="Arizona Mortgage Calculator"
      description="Explore estimated monthly payments and see how your down payment, interest rate, and loan term affect your budget." />
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="space-y-8 rounded-2xl border border-slate-800 bg-slate-900 p-6 md:p-8 lg:col-span-3">
        <div>
          <div className="mb-4 flex items-center justify-between"><label className="font-semibold">Home Purchase Price</label><span className="text-xl font-bold text-amber-400">{money(price)}</span></div>
          <input aria-label="Home purchase price" type="range" min="200000" max="4000000" step="10000" value={price} onChange={e => setPrice(+e.target.value)} className="w-full"/>
          <div className="mt-2 flex justify-between text-xs text-slate-500"><span>$200K</span><span>$4M</span></div>
        </div>
        <div>
          <div className="mb-4 flex items-center justify-between"><label className="font-semibold">Down Payment</label><span className="text-xl font-bold text-amber-400">{down}%</span></div>
          <input aria-label="Down payment percentage" type="range" min="3" max="50" step="1" value={down} onChange={e => setDown(+e.target.value)} className="w-full"/>
          <p className="mt-2 text-xs text-slate-400">Down payment amount: {money(calc.downPayment)}</p>
        </div>
        <div>
          <div className="mb-4 flex items-center justify-between"><label className="font-semibold">Interest Rate</label><span className="text-xl font-bold text-amber-400">{rate.toFixed(2)}%</span></div>
          <input aria-label="Interest rate" type="range" min="3.5" max="10" step=".125" value={rate} onChange={e => setRate(+e.target.value)} className="w-full"/>
          <div className="mt-2 flex justify-between text-xs text-slate-500"><span>3.5%</span><span>10%</span></div>
        </div>
        <div>
          <label className="mb-4 block font-semibold">Loan Term</label>
          <div className="grid grid-cols-2 gap-3">{[30,15].map(years => <button key={years} onClick={() => setTerm(years)}
            className={`rounded-lg border p-4 font-bold ${term === years ? "border-amber-400 bg-amber-400/10 text-amber-400" : "border-slate-700 text-slate-300"}`}>{years}-Year Fixed</button>)}</div>
        </div>
        <div>
          <label className="mb-3 block font-semibold" htmlFor="hoa">Monthly HOA Dues</label>
          <div className="relative"><span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
            <input id="hoa" type="number" min="0" value={hoa} onChange={e => setHoa(Math.max(0, Number(e.target.value)))} className="w-full rounded-lg border border-slate-700 bg-slate-950 p-4 pl-9 text-white outline-none focus:border-amber-400"/></div>
        </div>
        <p className="text-xs leading-5 text-slate-500">Estimates assume annual property tax of 0.60% and insurance of 0.35% of purchase price. Actual costs vary by property and location.</p>
      </div>
      <div className="flex flex-col rounded-2xl border border-amber-400/30 bg-slate-900 p-6 md:p-8 lg:col-span-2">
        <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">Estimated Monthly Payment</p>
        <h3 className="mb-2 mt-4 text-4xl font-extrabold text-amber-400">{preciseMoney(calc.total)}</h3>
        <p className="mb-8 text-sm text-slate-400">Based on your selected loan details</p>
        <div className="mb-6 flex h-3 w-full overflow-hidden rounded-full bg-slate-800">
          {items.map(([name,value,color]) => <div key={name} className={color} style={{width:`${calc.total > 0 ? value / calc.total * 100 : 0}%`}}/>)}
        </div>
        <div className="flex-1 space-y-5">
          {items.map(([name,value,color]) => <div key={name} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3"><span className={`h-3 w-3 rounded-full ${color}`}/><span className="text-sm text-slate-300">{name}</span></div>
            <span className="text-sm font-bold">{preciseMoney(value)}</span>
          </div>)}
        </div>
        <div className="my-7 space-y-3 border-t border-slate-700 pt-5 text-sm">
          <div className="flex justify-between"><span className="text-slate-400">Loan Amount</span><b>{money(calc.principal)}</b></div>
          <div className="flex justify-between"><span className="text-slate-400">Down Payment</span><b>{money(calc.downPayment)}</b></div>
        </div>
        <BookButton className="w-full">Discuss My Buying Options</BookButton>
        <p className="mt-4 text-center text-xs leading-5 text-slate-500">Estimates only. Excludes mortgage insurance, closing costs, utilities, maintenance, and other potential expenses. Not a loan offer or approval.</p>
      </div>
    </div>
  </section>;
}

function AgentProfile() {
  return <section id="contact" className="scroll-mt-28">
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
      <div className="grid md:grid-cols-5">
        <div className="relative min-h-[340px] bg-slate-800 md:col-span-2">
          <AgentPhoto className="absolute inset-0 h-full w-full object-cover object-top"/>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"/>
          <div className="absolute bottom-6 left-6"><p className="text-xs font-bold uppercase tracking-[.25em] text-amber-400">Your Arizona Real Estate Resource</p><h3 className="mt-2 text-2xl font-bold">{AGENT.name}</h3></div>
        </div>
        <div className="flex flex-col justify-center p-8 md:col-span-3 md:p-12">
          <p className="mb-3 text-xs font-bold uppercase tracking-[.3em] text-amber-400">Let's Make Your Next Move</p>
          <h2 className="text-3xl font-bold md:text-4xl">Real Estate Guidance. Personal Attention.</h2>
          <p className="mt-5 leading-7 text-slate-400">Whether you're buying, selling, or exploring the Arizona real estate market, Brian is ready to help you understand your options and make informed decisions.</p>
          <div className="my-8 space-y-5">
            <a href={AGENT.phoneLink} className="flex items-center gap-4 text-slate-300 hover:text-amber-400"><Phone className="text-amber-400" size={21}/>{AGENT.phone}</a>
            <a href={AGENT.website} target="_blank" rel="noreferrer" className="flex items-center gap-4 text-slate-300 hover:text-amber-400"><Globe className="text-amber-400" size={21}/>www.myazfamilyhome.com <ExternalLink size={14}/></a>
            <div className="flex items-center gap-4 text-slate-300"><Building2 className="text-amber-400" size={21}/>{AGENT.team} | {AGENT.brokerage}</div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row"><BookButton>Get On My Calendar</BookButton><a href={AGENT.phoneLink} className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 px-6 py-3 font-semibold hover:border-amber-400 hover:text-amber-400"><Phone size={17}/> Call Brian</a></div>
        </div>
      </div>
    </div>
  </section>;
}

export default function App() {
  const [activeTab, setActiveTab] = useState("valuation");
  const [mobileMenu, setMobileMenu] = useState(false);

  const goTo = (id) => {
    if (id === "valuation" || id === "mortgage") setActiveTab(id);
    setMobileMenu(false);
    window.setTimeout(() => document.getElementById(id)?.scrollIntoView({behavior:"smooth",block:"start"}), 100);
  };

  return <div className="min-h-screen bg-slate-950 font-sans text-white">
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a href="#" className="flex items-center gap-3"><AgentPhoto className="h-12 w-12 rounded-full border-2 border-amber-400"/><div><p className="text-sm font-bold">{AGENT.name}</p><p className="text-[10px] uppercase tracking-widest text-amber-400">{AGENT.team}</p></div></a>
        <nav className="hidden items-center gap-8 lg:flex">
          <button onClick={() => goTo("valuation")} className="text-sm text-slate-300 hover:text-amber-400">Home Valuation</button>
          <button onClick={() => goTo("mortgage")} className="text-sm text-slate-300 hover:text-amber-400">Mortgage Calculator</button>
          <button onClick={() => goTo("contact")} className="text-sm text-slate-300 hover:text-amber-400">Contact</button>
        </nav>
        <div className="hidden lg:block"><BookButton>Get On My Calendar</BookButton></div>
        <button className="text-white lg:hidden" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle navigation">{mobileMenu ? <X size={25}/> : <Menu size={25}/>}</button>
      </div>
      {mobileMenu && <div className="space-y-4 border-t border-slate-800 bg-slate-950 px-6 py-6 lg:hidden">
        <button onClick={() => goTo("valuation")} className="block w-full text-left text-slate-300">Home Valuation</button>
        <button onClick={() => goTo("mortgage")} className="block w-full text-left text-slate-300">Mortgage Calculator</button>
        <button onClick={() => goTo("contact")} className="block w-full text-left text-slate-300">Contact Brian</button>
        <BookButton className="w-full">Get On My Calendar</BookButton>
      </div>}
    </header>

    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-20 bg-cover bg-center" style={{backgroundImage:"url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85')"}}/>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/55"/>
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-5 lg:px-8 lg:py-28">
        <div className="lg:col-span-3">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-amber-300"><Sparkles size={14}/> Arizona Real Estate Tools</div>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">Your Arizona Home.<span className="block text-amber-400">Your Next Chapter.</span></h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">Discover your home's potential, explore your buying power, and take your next real estate step with confidence.</p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <button onClick={() => goTo("valuation")} className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-400 px-7 py-4 font-bold text-slate-950 hover:bg-amber-300"><Home size={19}/> What's My Home Worth?</button>
            <button onClick={() => goTo("mortgage")} className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/5 px-7 py-4 font-bold hover:border-amber-400 hover:text-amber-400"><Calculator size={19}/> Calculate My Payment</button>
          </div>
          <div className="mt-12 flex flex-wrap gap-8 border-t border-white/15 pt-7">
            <div><p className="text-2xl font-bold text-amber-400">Local</p><p className="mt-1 text-xs text-slate-400">Arizona Market Focus</p></div>
            <div><p className="text-2xl font-bold text-amber-400">Personal</p><p className="mt-1 text-xs text-slate-400">One-on-One Guidance</p></div>
            <div><p className="text-2xl font-bold text-amber-400">Informed</p><p className="mt-1 text-xs text-slate-400">Better Real Estate Decisions</p></div>
          </div>
        </div>
        <div className="mx-auto w-full max-w-sm rounded-2xl border border-white/15 bg-slate-950/75 p-6 shadow-2xl backdrop-blur-xl lg:col-span-2">
          <div className="text-center"><AgentPhoto className="mx-auto h-28 w-28 rounded-full border-4 border-amber-400"/><h2 className="mt-5 text-xl font-bold">{AGENT.name}</h2><p className="mt-1 text-xs font-semibold uppercase tracking-widest text-amber-400">{AGENT.team}</p><p className="mt-2 text-xs text-slate-400">{AGENT.brokerage}</p></div>
          <div className="my-6 space-y-4 border-y border-slate-800 py-5">
            <a href={AGENT.phoneLink} className="flex items-center justify-center gap-3 text-sm text-slate-300 hover:text-amber-400"><Phone size={17} className="text-amber-400"/>{AGENT.phone}</a>
            <a href={AGENT.website} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 text-sm text-slate-300 hover:text-amber-400"><Globe size={17} className="text-amber-400"/>myazfamilyhome.com</a>
          </div>
          <BookButton className="w-full">Book a Meeting with Brian</BookButton>
        </div>
      </div>
    </section>

    <section className="border-y border-slate-800 bg-slate-900/70">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-7 sm:grid-cols-3 lg:px-8">
        {[[ShieldCheck,"Informed Decisions","Understand your options"],[TrendingUp,"Market Awareness","Explore property values"],[CalendarDays,"Personal Guidance","Connect directly with Brian"]].map(([Icon,title,sub]) =>
          <div key={title} className="flex items-center justify-center gap-4"><Icon className="text-amber-400" size={28}/><div><p className="font-bold">{title}</p><p className="text-xs text-slate-400">{sub}</p></div></div>)}
      </div>
    </section>

    <main className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <div className="mx-auto mb-14 flex max-w-xl rounded-xl border border-slate-800 bg-slate-900 p-2">
        <button onClick={() => {setActiveTab("valuation");goTo("valuation");}} className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-4 text-sm font-bold ${activeTab === "valuation" ? "bg-amber-400 text-slate-950" : "text-slate-400 hover:text-white"}`}><Home size={18}/>Home Valuation</button>
        <button onClick={() => {setActiveTab("mortgage");goTo("mortgage");}} className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-4 text-sm font-bold ${activeTab === "mortgage" ? "bg-amber-400 text-slate-950" : "text-slate-400 hover:text-white"}`}><Calculator size={18}/>Mortgage Calculator</button>
      </div>
      <div className={activeTab === "valuation" ? "block" : "hidden"}><HomeValuation/></div>
      <div className={activeTab === "mortgage" ? "block" : "hidden"}><MortgageCalculator/></div>
      <div className="mt-24"><AgentProfile/></div>
    </main>

    <section className="border-y border-amber-400/20 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 px-5 py-20 text-center">
      <p className="mb-4 text-xs font-bold uppercase tracking-[.3em] text-amber-400">Your Next Move Starts Here</p>
      <h2 className="mx-auto max-w-3xl text-3xl font-extrabold md:text-5xl">Let's Talk About Your Real Estate Goals.</h2>
      <p className="mx-auto mt-5 max-w-xl leading-7 text-slate-400">Have questions about buying or selling in Arizona? Connect with Brian and start planning your next move.</p>
      <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row"><BookButton>Schedule Your Consultation</BookButton><a href={AGENT.phoneLink} className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-600 px-6 py-3 font-bold hover:border-amber-400 hover:text-amber-400"><Phone size={18}/>Call {AGENT.phone}</a></div>
    </section>

    <footer className="bg-slate-950 px-5 py-12">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 md:flex-row md:items-center lg:px-8">
        <div className="flex items-center gap-4"><AgentPhoto className="h-14 w-14 rounded-full border-2 border-amber-400"/><div><p className="font-bold">{AGENT.name}</p><p className="text-xs text-amber-400">{AGENT.team}</p><p className="text-xs text-slate-500">{AGENT.brokerage}</p></div></div>
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-400"><button onClick={() => goTo("valuation")} className="hover:text-amber-400">Home Valuation</button><button onClick={() => goTo("mortgage")} className="hover:text-amber-400">Mortgage Calculator</button><button onClick={() => goTo("contact")} className="hover:text-amber-400">Contact</button><a href={AGENT.website} target="_blank" rel="noreferrer" className="hover:text-amber-400">Official Website</a></div>
        <div className="flex gap-4"><a href={AGENT.phoneLink} aria-label="Call Brian" className="rounded-full border border-slate-700 p-3 hover:border-amber-400 hover:text-amber-400"><Phone size={18}/></a><a href={AGENT.calendly} target="_blank" rel="noreferrer" aria-label="Schedule" className="rounded-full border border-slate-700 p-3 hover:border-amber-400 hover:text-amber-400"><CalendarDays size={18}/></a><a href={AGENT.website} target="_blank" rel="noreferrer" aria-label="Website" className="rounded-full border border-slate-700 p-3 hover:border-amber-400 hover:text-amber-400"><Globe size={18}/></a></div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-slate-800 pt-6 text-center lg:px-8">
        <p className="text-xs text-slate-500">© {new Date().getFullYear()} {AGENT.name} | {AGENT.team} | {AGENT.brokerage}</p>
        <p className="mt-2 text-xs text-slate-600">All information is deemed reliable but not guaranteed. Estimates and mortgage calculations are for informational purposes only.</p>
      </div>
    </footer>
  </div>;
}