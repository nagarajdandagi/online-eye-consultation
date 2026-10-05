import React from "react";
import Link from "next/link";
import {
  Eye,
  ShieldCheck,
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  Heart,
  Award
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white">
                <Eye className="w-6 h-6 stroke-[2.2]" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Opti<span className="text-teal-400">Cure</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              OptiCure is an NABH-accredited ophthalmic healthcare platform connecting patients with India’s top certified eye surgeons for video consultations and advanced surgical care.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-xs text-emerald-400 font-medium">
                <Award className="w-4 h-4" />
                NABH Digital Health Certified
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-xs text-sky-400 font-medium">
                <ShieldCheck className="w-4 h-4" />
                ISO 27001 Security
              </div>
            </div>
          </div>

          {/* Eye Specialties */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100">
              Ophthalmic Sub-Specialties
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/doctors?specialty=cataract" className="hover:text-teal-400 transition-colors">
                  Cataract & Blade-Free IOL
                </Link>
              </li>
              <li>
                <Link href="/doctors?specialty=retina" className="hover:text-teal-400 transition-colors">
                  Vitreo-Retina & Macula
                </Link>
              </li>
              <li>
                <Link href="/doctors?specialty=lasik" className="hover:text-teal-400 transition-colors">
                  Contoura & SMILE LASIK
                </Link>
              </li>
              <li>
                <Link href="/doctors?specialty=glaucoma" className="hover:text-teal-400 transition-colors">
                  Glaucoma & Eye Pressure
                </Link>
              </li>
              <li>
                <Link href="/doctors?specialty=pediatric" className="hover:text-teal-400 transition-colors">
                  Pediatric Squint & Amblyopia
                </Link>
              </li>
              <li>
                <Link href="/doctors?specialty=dry-eye" className="hover:text-teal-400 transition-colors">
                  Dry Eye & Digital Strain
                </Link>
              </li>
            </ul>
          </div>

          {/* Hospital Locations */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100">
              Major Eye Centers
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/doctors?location=Bangalore" className="hover:text-teal-400 transition-colors">
                  Bangalore (Indiranagar, Whitefield)
                </Link>
              </li>
              <li>
                <Link href="/doctors?location=Mumbai" className="hover:text-teal-400 transition-colors">
                  Mumbai (Bandra West, Andheri)
                </Link>
              </li>
              <li>
                <Link href="/doctors?location=Delhi-NCR" className="hover:text-teal-400 transition-colors">
                  Delhi-NCR (South Extension, Gurgaon)
                </Link>
              </li>
              <li>
                <Link href="/doctors?location=Hyderabad" className="hover:text-teal-400 transition-colors">
                  Hyderabad (Hitec City, Banjara Hills)
                </Link>
              </li>
              <li>
                <Link href="/doctors?location=Chennai" className="hover:text-teal-400 transition-colors">
                  Chennai (T. Nagar, Adyar)
                </Link>
              </li>
              <li>
                <Link href="/doctors?location=Pune" className="hover:text-teal-400 transition-colors">
                  Pune (Koregaon Park, Baner)
                </Link>
              </li>
            </ul>
          </div>

          {/* Clinical Contact & Emergency */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100">
              Clinical Support
            </h4>
            <div className="space-y-2.5 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <PhoneCall className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-200">24x7 Eye Emergency Helpline</div>
                  <div className="text-amber-300 font-semibold text-xs">1800-419-3937 (Toll Free)</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span className="text-xs">care@opticurehealth.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-teal-400 shrink-0" />
                <span className="text-xs">Online Consult: 7:00 AM – 11:00 PM</span>
              </div>
              <div className="pt-2">
                <Link
                  href="/doctors?mode=online"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-500/20 text-teal-300 hover:bg-teal-500/30 text-xs font-semibold border border-teal-500/30 transition-colors"
                >
                  ⚡ Start Instant Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Medical Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p className="max-w-3xl text-center md:text-left leading-relaxed">
            <strong className="text-slate-400">Clinical Disclaimer:</strong> Telemedicine consultations on OptiCure follow the Telemedicine Practice Guidelines issued by the National Medical Commission (NMC) of India. In cases of sudden vision loss, severe trauma, chemical burns, or acute painful red eyes, immediate in-person hospital emergency care is advised.
          </p>
          <div className="flex items-center gap-4 shrink-0 text-slate-400">
            <span>© 2026 OptiCure Health Technologies Pvt. Ltd.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
