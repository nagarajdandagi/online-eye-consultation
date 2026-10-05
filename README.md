# OptiCure Eye Health — Modern Ophthalmology Doctor Consultation Platform

OptiCure is an ophthalmology consultation and hospital telehealth platform built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS**.

---

## 🌟 Key Platform Features

1. **Dual-Mode Doctor Booking**:
   - Seamlessly toggle between **Online HD Video Consultation** and **In-Clinic Hospital Visits** without losing date/slot selection.
2. **Multi-Criteria Doctor Search & Filtering**:
   - Filter by sub-specialty (Vitreo-Retina, Cornea & LASIK, Cataract & IOL, Glaucoma, Pediatric Squint, Oculoplasty, Dry Eye), city/locality (Bangalore, Mumbai, Delhi-NCR, Hyderabad, Chennai, Pune), fee slider, experience, language, and rating.
   - Live URL query synchronization (`/doctors?q=...&city=...&specialty=...&mode=...`).
3. **Deep Clinical Doctor Profiles**:
   - Medical Council Registration numbers (e.g. `KMC-64812`), university degrees, fellowship details, verified patient reviews with eye condition tags, transparent procedure pricing, and interactive slot scheduler.
4. **Interactive Browser Telehealth Suite**:
   - Simulated WebRTC consultation room (`/consultation/[id]`) with local camera preview, in-call chat, patient dossier sidebar, call timer, and post-consultation digital prescription issuance.
5. **Specialized Ophthalmic Digital Prescription & EMR**:
   - Left/Right eye (OD/OS) refractive measurements (Sphere, Cylinder, Axis, Visual Acuity), Intraocular Pressure (IOP mmHg), and tapering eye-drop schedules.
6. **Role-Based Portals**:
   - **Patient Portal (`/patient/dashboard`)**: Upcoming & completed visits, visual acuity history tracker, prescription slips, and diagnostic scan vault.
   - **Doctor Portal (`/doctor/dashboard`)**: Queue management, schedule & slot availability configurator, patient dossiers, and digital prescription writer.
   - **Admin Console (`/admin`)**: Doctor onboarding and Medical Council verification, central appointments ledger, and Razorpay transaction audit.
7. **Razorpay Payment Integration**:
   - Itemized transparent fees (Consultation + Platform fee + GST) with integrated simulation for Cards, UPI (GPay/PhonePe), and NetBanking.

---

## 🚀 Running the Project Locally

```bash
# 1. Install dependencies (if not already done)
npm install

# 2. Run Next.js development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 🧭 Page Routes & Live Demos

| Page | URL Route | Description |
| :--- | :--- | :--- |
| **Homepage** | [`/`](http://localhost:3000) | Clinical hero, multi-criteria search, symptoms router, featured surgeons, FAQs |
| **Doctor Listing** | [`/doctors`](http://localhost:3000/doctors) | Filterable directory with live search, URL sync, and responsive sidebar |
| **Doctor Profile** | [`/doctors/dr-arundhati-deshmukh`](http://localhost:3000/doctors/dr-arundhati-deshmukh) | Profile, credentials, procedure pricing, reviews, and interactive booking widget |
| **Booking Flow** | [`/book/doc-1`](http://localhost:3000/book/doc-1) | 3-step checkout with patient symptoms, Razorpay simulation, and confetti |
| **Telehealth Room**| [`/consultation/apt-101`](http://localhost:3000/consultation/apt-101) | In-browser video room with call controls, chat, and patient dossier |
| **Patient Dashboard** | [`/patient/dashboard`](http://localhost:3000/patient/dashboard) | Appointments, refraction history table (OD/OS), and printable PDF slip |
| **Doctor Portal** | [`/doctor/dashboard`](http://localhost:3000/doctor/dashboard) | Queue, availability schedule, and specialized eye-drop prescription writer |
| **Admin Console** | [`/admin`](http://localhost:3000/admin) | Doctor credential approvals, master appointments ledger, and payments audit |
| **Specialties Directory** | [`/specialities`](http://localhost:3000/specialities) | Comprehensive guide to 8 ophthalmic sub-disciplines |
| **Specialty Guide** | [`/specialities/cataract-refractive`](http://localhost:3000/specialities/cataract-refractive) | Detailed symptoms, diagnostic tests, and doctor routing |
| **Authentication** | [`/auth/login`](http://localhost:3000/auth/login) | Role-based login with 1-click quick demo access |

---

## ⚙️ Environment Variables (`.env`)

```env
DATABASE_URL="file:./dev.db" # Easily switchable to PostgreSQL: postgresql://user:password@localhost:5432/opticure
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="OptiCure Eye Health"
RAZORPAY_KEY_ID="rzp_test_opticure_mock_key"
RAZORPAY_KEY_SECRET="rzp_test_opticure_mock_secret"
AUTH_SECRET="opticure-production-super-secret-key-32-chars-minimum"
```
