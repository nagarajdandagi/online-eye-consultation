import { Doctor } from "@/types";

export const DOCTORS: Doctor[] = [
  {
    id: "doc-pooja-sankeshwar",
    slug: "dr-pooja-sankeshwar",
    name: "Dr. Pooja Sankeshwar",
    title: "Director of Cataract, Cornea & Refractive Laser Surgery",
    gender: "Female",
    profileImage: "/doctors/dr-pooja-sankeshwar.jpg",
    qualifications: ["MBBS", "MS (Ophthalmology)", "DNB", "Cornea & Refractive Fellowship (Sankara Nethralaya)", "FICO (UK)"],
    specialization: "Cataract, Cornea & Advanced Refractive Surgery",
    subSpecialties: ["Robotic Laser Cataract (FLACS)", "Contoura Vision LASIK & SMILE Pro", "Keratoconus (C3R)", "Premium Trifocal & EDOF IOLs", "Dry Eye Management"],
    experienceYears: 18,
    registrationNumber: "KMC-54918",
    languages: ["English", "Kannada", "Hindi", "Marathi"],
    onlineConsultation: true,
    clinicConsultation: true,
    onlineFee: 800,
    clinicFee: 1000,
    rating: 4.98,
    reviewCount: 642,
    patientsTreated: 14500,
    about: "Dr. Pooja Sankeshwar is a renowned senior ophthalmologist and refractive microsurgeon with over 18 years of clinical and surgical expertise. Having trained at premier ophthalmic centers of excellence including Sankara Nethralaya, she has performed over 10,000 successful cataract and laser vision correction surgeries. Dr. Pooja is celebrated for her clinical precision with advanced premium intraocular lenses (Trifocals & Torics), Contoura Vision blade-free LASIK, and personalized patient care.",
    expertise: [
      "Femtosecond Laser-Assisted Cataract Surgery (FLACS)",
      "Custom Contoura Vision LASIK & SMILE Pro",
      "Premium Trifocal & Toric Intraocular Lens Implantation",
      "Corneal Collagen Cross-Linking (C3R) for Keratoconus",
      "Thermal Pulsation & Meibomian Gland Dry Eye Therapy"
    ],
    servicesOffered: [
      { name: "Comprehensive Cataract & Corneal Topography Workup", price: 1500 },
      { name: "Contoura Vision Blade-Free LASIK (Both Eyes)", price: 85000 },
      { name: "Robotic Laser Cataract Surgery with Premium Trifocal IOL", price: 75000 },
      { name: "Corneal Collagen Cross-Linking (C3R)", price: 28000 }
    ],
    education: [
      { degree: "MBBS", institution: "Bangalore Medical College and Research Institute", year: "2006" },
      { degree: "MS Ophthalmology", institution: "Regional Institute of Ophthalmology, Minto Eye Hospital", year: "2010" },
      { degree: "Fellowship in Cornea & Refractive Surgery", institution: "Sankara Nethralaya, Chennai", year: "2012" },
      { degree: "Fellow of International Council of Ophthalmology (FICO)", institution: "ICO London, United Kingdom", year: "2014" }
    ],
    hospital: {
      id: "hosp-1",
      name: "OptiCure Apex Eye Hospital",
      city: "Bangalore",
      locality: "Indiranagar",
      address: "100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038",
      phone: "+91 80 4920 1100",
      rating: 4.98,
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600"
    },
    clinic: {
      id: "clinic-1",
      name: "OptiCure Premier Laser & Eye Center",
      city: "Bangalore",
      locality: "Indiranagar",
      address: "100 Feet Road, Indiranagar, Bengaluru",
      phone: "+91 80 4920 1101"
    },
    nextAvailableSlot: {
      date: "Today",
      time: "05:00 PM",
      mode: "ONLINE"
    },
    isVerified: true,
    isFeatured: true
  },
  {
    id: "doc-1",
    slug: "dr-arundhati-deshmukh",
    name: "Dr. Arundhati Deshmukh",
    title: "Senior Consultant Vitreo-Retinal Surgeon",
    gender: "Female",
    profileImage: "https://images.unsplash.com/photo-1594824813589-44e21a2c3569?auto=format&fit=crop&q=80&w=400",
    qualifications: ["MBBS", "MS (Ophthalmology)", "Fellowship Vitreo-Retina (Sankara Nethralaya)", "FRCS (Glasgow)"],
    specialization: "Vitreo-Retina & Macular Surgery",
    subSpecialties: ["Diabetic Retinopathy", "Retinal Detachment", "Macular Degeneration", "Retinal Vein Occlusion"],
    experienceYears: 16,
    registrationNumber: "KMC-64812",
    languages: ["English", "Hindi", "Kannada", "Marathi"],
    onlineConsultation: true,
    clinicConsultation: true,
    onlineFee: 750,
    clinicFee: 900,
    rating: 4.9,
    reviewCount: 384,
    patientsTreated: 8500,
    about: "Dr. Arundhati Deshmukh is an internationally trained vitreo-retinal surgeon with over 16 years of experience in managing complex diabetic eye diseases, maculopathies, and minimally invasive sutureless vitrectomy (MIVS). Having trained at the esteemed Sankara Nethralaya, Chennai, she is renowned for her patient-first demeanor and precision diagnostics.",
    expertise: [
      "25G & 27G Sutureless Vitrectomy",
      "Anti-VEGF Injections (Lucentis, Eylea, Vabysmo)",
      "Retinal Laser Photocoagulation",
      "Diabetic Macular Edema Management",
      "OCT Angiography Interpretation"
    ],
    servicesOffered: [
      { name: "Comprehensive Retinal Evaluation & Dilated Funduscopy", price: 1200 },
      { name: "Optical Coherence Tomography (OCT) High-Res Scan", price: 1800 },
      { name: "Intravitreal Anti-VEGF Injection Therapy", price: 18500 },
      { name: "Green Argon Laser Retinal Barrage", price: 4500 }
    ],
    education: [
      { degree: "MBBS", institution: "Bangalore Medical College and Research Institute", year: "2008" },
      { degree: "MS Ophthalmology", institution: "Regional Institute of Ophthalmology, Minto Eye Hospital", year: "2012" },
      { degree: "Fellowship in Vitreo-Retina", institution: "Sankara Nethralaya, Chennai", year: "2014" },
      { degree: "FRCS (Ophth)", institution: "Royal College of Physicians & Surgeons of Glasgow", year: "2016" }
    ],
    hospital: {
      id: "hosp-1",
      name: "OptiCure Apex Eye Hospital",
      city: "Bangalore",
      locality: "Indiranagar",
      address: "100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038",
      phone: "+91 80 4920 1100",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600"
    },
    clinic: {
      id: "clinic-1",
      name: "OptiCure Specialty Clinic Indiranagar",
      city: "Bangalore",
      locality: "Indiranagar",
      address: "Suite 302, 100 Feet Rd, Indiranagar, Bengaluru",
      phone: "+91 80 4920 1101"
    },
    nextAvailableSlot: {
      date: "Today",
      time: "04:30 PM",
      mode: "ONLINE"
    },
    isVerified: true,
    isFeatured: true
  },
  {
    id: "doc-2",
    slug: "dr-vikram-sengupta",
    name: "Dr. Vikram Sengupta",
    title: "Director of Cornea & Refractive Laser Center",
    gender: "Male",
    profileImage: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400",
    qualifications: ["MBBS", "MS (Ophthalmology - AIIMS New Delhi)", "Cornea Fellowship (LVPEI)", "FICO (UK)"],
    specialization: "Cornea, External Diseases & LASIK",
    subSpecialties: ["Keratoconus (CXL)", "Femto-LASIK & SMILE", "Corneal Transplants (DMEK/DALK)", "Dry Eye Syndrome"],
    experienceYears: 19,
    registrationNumber: "KMC-58210",
    languages: ["English", "Hindi", "Bengali", "Kannada"],
    onlineConsultation: true,
    clinicConsultation: true,
    onlineFee: 800,
    clinicFee: 1000,
    rating: 4.95,
    reviewCount: 520,
    patientsTreated: 12000,
    about: "Dr. Vikram Sengupta is one of India's foremost authorities on corneal transplants and blade-free laser vision correction. An alumnus of AIIMS New Delhi and L.V. Prasad Eye Institute, he has successfully performed over 7,000 laser vision correction procedures and pioneer partial-thickness endothelial keratoplasty (DMEK).",
    expertise: [
      "Custom Contoura Vision LASIK & SMILE Pro",
      "Corneal Collagen Cross-Linking (C3R / CXL) for Keratoconus",
      "Descemet Membrane Endothelial Keratoplasty (DMEK)",
      "Intense Pulsed Light (IPL) Therapy for Severe Dry Eye",
      "Amniotic Membrane Transplantation"
    ],
    servicesOffered: [
      { name: "Corneal Topography & Wavefront Aberrometry Evaluation", price: 1500 },
      { name: "Blade-Free Contoura Vision LASIK (Both Eyes)", price: 85000 },
      { name: "Corneal Collagen Cross-Linking (C3R)", price: 28000 },
      { name: "IPL Dry Eye LipiFlow Spa Treatment Session", price: 6500 }
    ],
    education: [
      { degree: "MBBS", institution: "Maulana Azad Medical College, New Delhi", year: "2005" },
      { degree: "MS Ophthalmology", institution: "Dr. R.P. Centre for Ophthalmic Sciences, AIIMS New Delhi", year: "2009" },
      { degree: "Fellowship in Cornea & Refractive", institution: "L.V. Prasad Eye Institute (LVPEI), Hyderabad", year: "2011" }
    ],
    hospital: {
      id: "hosp-1",
      name: "OptiCure Apex Eye Hospital",
      city: "Bangalore",
      locality: "Indiranagar",
      address: "100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038",
      phone: "+91 80 4920 1100",
      rating: 4.9
    },
    clinic: {
      id: "clinic-2",
      name: "OptiCure Laser Suite Whitefield",
      city: "Bangalore",
      locality: "Whitefield",
      address: "ITPL Main Road, Prestige Tech Park Area, Whitefield, Bengaluru",
      phone: "+91 80 4920 1200"
    },
    nextAvailableSlot: {
      date: "Tomorrow",
      time: "10:30 AM",
      mode: "CLINIC"
    },
    isVerified: true,
    isFeatured: true
  },
  {
    id: "doc-3",
    slug: "dr-ananya-sharma",
    name: "Dr. Ananya Sharma",
    title: "Consultant Glaucoma Specialist & Cataract Surgeon",
    gender: "Female",
    profileImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400",
    qualifications: ["MBBS", "DNB (Ophthalmology)", "Fellowship in Glaucoma (Aravind Eye Hospital)"],
    specialization: "Glaucoma & Micro-Incision Cataract (MICS)",
    subSpecialties: ["Normal Tension Glaucoma", "MIGS (Micro-Invasive Glaucoma Surgery)", "Phacoemulsification", "Laser Iridotomy"],
    experienceYears: 12,
    registrationNumber: "KMC-79402",
    languages: ["English", "Hindi", "Telugu", "Tamil"],
    onlineConsultation: true,
    clinicConsultation: true,
    onlineFee: 650,
    clinicFee: 800,
    rating: 4.85,
    reviewCount: 290,
    patientsTreated: 6200,
    about: "Dr. Ananya Sharma specializes in early detection of glaucoma before irreversible peripheral visual field loss sets in. Having performed thousands of successful Phacoemulsification cataract surgeries with premium multifocal and toric lenses, she emphasizes tailored, compassionate patient counseling.",
    expertise: [
      "Humphrey Visual Field (HVF) & RNFL Progression Analysis",
      "Selective Laser Trabeculoplasty (SLT)",
      "Micro-Incision Cataract Surgery (MICS) with Toric/EDOF IOLs",
      "Ahmed Glaucoma Valve (AGV) Implantations",
      "Peripheral Nd:YAG Laser Iridotomy"
    ],
    servicesOffered: [
      { name: "Comprehensive Glaucoma Screening & Tonometry", price: 900 },
      { name: "Humphrey Automated Perimetry (Both Eyes)", price: 1600 },
      { name: "Micro-Incision Cataract Surgery with Monofocal IOL", price: 32000 },
      { name: "Selective Laser Trabeculoplasty (SLT)", price: 12000 }
    ],
    education: [
      { degree: "MBBS", institution: "Osmania Medical College, Hyderabad", year: "2012" },
      { degree: "DNB Ophthalmology", institution: "National Board of Examinations, New Delhi", year: "2016" },
      { degree: "Glaucoma Fellowship", institution: "Aravind Eye Care System, Madurai", year: "2018" }
    ],
    hospital: {
      id: "hosp-2",
      name: "OptiCure City Eye Institute",
      city: "Bangalore",
      locality: "Koramangala",
      address: "80 Feet Road, 4th Block, Koramangala, Bengaluru, Karnataka 560034",
      phone: "+91 80 4920 2200",
      rating: 4.8
    },
    clinic: {
      id: "clinic-3",
      name: "OptiCure Koramangala Eye Center",
      city: "Bangalore",
      locality: "Koramangala",
      address: "80 Feet Road, 4th Block, Koramangala, Bengaluru",
      phone: "+91 80 4920 2201"
    },
    nextAvailableSlot: {
      date: "Today",
      time: "06:00 PM",
      mode: "ONLINE"
    },
    isVerified: true,
    isFeatured: true
  },
  {
    id: "doc-4",
    slug: "dr-rajesh-kulkarni",
    name: "Dr. Rajesh Kulkarni",
    title: "Chief Pediatric Ophthalmologist & Strabismus Surgeon",
    gender: "Male",
    profileImage: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400",
    qualifications: ["MBBS", "MS (Ophthalmology)", "Fellowship in Pediatric Ophthalmology (Narayana Nethralaya)"],
    specialization: "Pediatric Ophthalmology & Squint",
    subSpecialties: ["Amblyopia (Lazy Eye)", "Adult & Child Strabismus", "Congenital Cataract", "Pediatric Refraction"],
    experienceYears: 15,
    registrationNumber: "KMC-69123",
    languages: ["English", "Kannada", "Hindi", "Marathi"],
    onlineConsultation: true,
    clinicConsultation: true,
    onlineFee: 700,
    clinicFee: 850,
    rating: 4.9,
    reviewCount: 410,
    patientsTreated: 7800,
    about: "Dr. Rajesh Kulkarni is renowned for his child-friendly clinical examination techniques. He specializes in early amblyopia patching therapy, complex paralytic squint surgeries, and adjustable suture strabismus correction in children and adults.",
    expertise: [
      "Prism Correction & Vision Therapy Exercises",
      "Surgical Squint Alignment (Rectus Muscle Recession/Resection)",
      "Cycloplegic Retinoscopy in Toddlers & Non-Verbal Children",
      "Congenital Tear Duct Probing under Local Anesthesia",
      "Computer Vision Strain Therapy in Teenagers"
    ],
    servicesOffered: [
      { name: "Pediatric Visual Acuity & Orthoptic Assessment", price: 1000 },
      { name: "Strabismus (Squint) Surgical Correction (Per Muscle)", price: 25000 },
      { name: "Amblyopia Vision Therapy (10 Session Package)", price: 8000 }
    ],
    education: [
      { degree: "MBBS", institution: "Kasturba Medical College, Manipal", year: "2009" },
      { degree: "MS Ophthalmology", institution: "JSS Medical College, Mysore", year: "2013" },
      { degree: "Fellowship Pediatric Ophthalmology", institution: "Narayana Nethralaya, Bengaluru", year: "2015" }
    ],
    hospital: {
      id: "hosp-1",
      name: "OptiCure Apex Eye Hospital",
      city: "Bangalore",
      locality: "Indiranagar",
      address: "100 Feet Road, Indiranagar, Bengaluru",
      phone: "+91 80 4920 1100",
      rating: 4.9
    },
    clinic: {
      id: "clinic-1",
      name: "OptiCure Specialty Clinic Indiranagar",
      city: "Bangalore",
      locality: "Indiranagar",
      address: "100 Feet Rd, Indiranagar, Bengaluru",
      phone: "+91 80 4920 1101"
    },
    nextAvailableSlot: {
      date: "Tomorrow",
      time: "11:00 AM",
      mode: "CLINIC"
    },
    isVerified: true,
    isFeatured: false
  },
  {
    id: "doc-5",
    slug: "dr-priya-nambiar",
    name: "Dr. Priya Nambiar",
    title: "Senior Oculofacial Plastic & Orbital Surgeon",
    gender: "Female",
    profileImage: "https://images.unsplash.com/photo-1594824813589-44e21a2c3569?auto=format&fit=crop&q=80&w=400",
    qualifications: ["MBBS", "MS (Ophthalmology)", "Fellowship in Oculoplasty & Facial Aesthetics (Aravind)"],
    specialization: "Oculoplasty & Facial Aesthetics",
    subSpecialties: ["Ptosis (Drooping Eyelids)", "Blepharoplasty", "Dacryocystorhinostomy (DCR)", "Thyroid Eye Disease"],
    experienceYears: 14,
    registrationNumber: "KMC-71954",
    languages: ["English", "Malayalam", "Tamil", "Hindi"],
    onlineConsultation: true,
    clinicConsultation: true,
    onlineFee: 750,
    clinicFee: 950,
    rating: 4.88,
    reviewCount: 230,
    patientsTreated: 5400,
    about: "Dr. Priya Nambiar combines meticulous microsurgical precision with aesthetic artistry. She manages eyelid malpositions, cosmetic blepharoplasties, watery eye tear duct blockages, and orbital reconstructions.",
    expertise: [
      "Upper & Lower Lid Blepharoplasty",
      "Levator Resection & Frontalis Sling for Ptosis",
      "Endoscopic Endonasal DCR (Scarless Tear Duct Surgery)",
      "Botulinum Toxin for Blepharospasm & Hemifacial Spasm",
      "Orbital Decompression for Graves Orbitopathy"
    ],
    servicesOffered: [
      { name: "Oculoplastic & Eyelid Functional Consultation", price: 1100 },
      { name: "Endonasal Laser DCR for Watery Eye", price: 38000 },
      { name: "Ptosis Correction Eyelid Surgery", price: 34000 },
      { name: "Therapeutic Botox Injection for Involuntary Eye Twitching", price: 9500 }
    ],
    education: [
      { degree: "MBBS", institution: "Government Medical College, Kozhikode", year: "2010" },
      { degree: "MS Ophthalmology", institution: "Madras Medical College, Chennai", year: "2014" },
      { degree: "Fellowship Oculoplasty", institution: "Aravind Eye Hospital, Madurai", year: "2016" }
    ],
    hospital: {
      id: "hosp-2",
      name: "OptiCure City Eye Institute",
      city: "Bangalore",
      locality: "Koramangala",
      address: "80 Feet Road, Koramangala, Bengaluru",
      phone: "+91 80 4920 2200",
      rating: 4.8
    },
    clinic: {
      id: "clinic-3",
      name: "OptiCure Koramangala Eye Center",
      city: "Bangalore",
      locality: "Koramangala",
      address: "80 Feet Road, Koramangala, Bengaluru",
      phone: "+91 80 4920 2201"
    },
    nextAvailableSlot: {
      date: "Today",
      time: "07:30 PM",
      mode: "ONLINE"
    },
    isVerified: true,
    isFeatured: false
  },
  {
    id: "doc-6",
    slug: "dr-manoj-mehta",
    name: "Dr. Manoj Mehta",
    title: "Senior Cataract & Premium IOL Specialist",
    gender: "Male",
    profileImage: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400",
    qualifications: ["MBBS", "MS (Ophthalmology)", "FICO (Tokyo)", "Fellowship in Cataract Surgery"],
    specialization: "Cataract & Refractive Surgery",
    subSpecialties: ["Robotic Laser Cataract (FLACS)", "Trifocal & EDOF Lenses", "Toric Astigmatism Correction"],
    experienceYears: 22,
    registrationNumber: "MMC-48192",
    languages: ["English", "Hindi", "Gujarati", "Marathi"],
    onlineConsultation: true,
    clinicConsultation: true,
    onlineFee: 800,
    clinicFee: 1000,
    rating: 4.92,
    reviewCount: 680,
    patientsTreated: 16000,
    about: "Dr. Manoj Mehta is a master cataract surgeon with over two decades of surgical leadership in Mumbai and Bangalore. He has successfully restored vision in over 15,000 patients using blade-free femtosecond laser cataract surgery and premium trifocal intraocular lenses.",
    expertise: [
      "Femtosecond Laser-Assisted Cataract Surgery (FLACS)",
      "PanOptix & Synergy Trifocal Lens Implantation",
      "Toric IOL Alignment with Verion Digital Marker",
      "Secondary IOL & Scleral Fixated Intraocular Lenses (SFIOL)",
      "Challenging Small Pupil & Mature Cataract Phaco"
    ],
    servicesOffered: [
      { name: "Cataract Evaluation with IOL Master 700 Biometry", price: 1500 },
      { name: "FLACS Blade-Free Laser Cataract Surgery with Monofocal IOL", price: 45000 },
      { name: "Laser Cataract with Premium Trifocal IOL (Glasses-Free)", price: 85000 }
    ],
    education: [
      { degree: "MBBS", institution: "Grant Government Medical College & Sir JJ Group of Hospitals, Mumbai", year: "2002" },
      { degree: "MS Ophthalmology", institution: "KEM Hospital and Seth GS Medical College, Mumbai", year: "2006" },
      { degree: "Fellowship Anterior Segment", institution: "Juntendo University, Tokyo, Japan", year: "2008" }
    ],
    hospital: {
      id: "hosp-3",
      name: "OptiCure Mumbai Eye Foundation",
      city: "Mumbai",
      locality: "Bandra West",
      address: "Turner Road, Bandra West, Mumbai, Maharashtra 400050",
      phone: "+91 22 4920 3300",
      rating: 4.95
    },
    clinic: {
      id: "clinic-4",
      name: "OptiCure Bandra Premier Clinic",
      city: "Mumbai",
      locality: "Bandra West",
      address: "Turner Road, Bandra West, Mumbai",
      phone: "+91 22 4920 3301"
    },
    nextAvailableSlot: {
      date: "Tomorrow",
      time: "09:30 AM",
      mode: "CLINIC"
    },
    isVerified: true,
    isFeatured: true
  },
  {
    id: "doc-7",
    slug: "dr-shilpa-reddy",
    name: "Dr. Shilpa Reddy",
    title: "Consultant Dry Eye & Ocular Surface Specialist",
    gender: "Female",
    profileImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400",
    qualifications: ["MBBS", "DO", "DNB (Ophthalmology)", "Fellowship Ocular Surface"],
    specialization: "Advanced Dry Eye & Digital Strain",
    subSpecialties: ["Computer Vision Syndrome", "Meibomian Gland Dysfunction", "Punctal Plugs", "Allergic Conjunctivitis"],
    experienceYears: 10,
    registrationNumber: "TSMC-84910",
    languages: ["English", "Telugu", "Hindi"],
    onlineConsultation: true,
    clinicConsultation: true,
    onlineFee: 500,
    clinicFee: 700,
    rating: 4.82,
    reviewCount: 195,
    patientsTreated: 4200,
    about: "Dr. Shilpa Reddy leads the dedicated Dry Eye and Digital Eye Strain clinic in Hyderabad and Bangalore. She offers personalized therapeutic regimens for IT professionals, students, and post-LASIK patients suffering from chronic ocular dryness.",
    expertise: [
      "Non-Invasive Tear Break-Up Time (NIBUT) Diagnostic Analysis",
      "Infrared Meibography & Gland Expression",
      "Dissolvable & Silicone Punctal Plug Insertion",
      "Autologous Serum Eye Drop Protocol",
      "Custom Ergonomic Guidance for Digital Screens"
    ],
    servicesOffered: [
      { name: "Dry Eye Workup & Meibomian Gland Infrared Imaging", price: 800 },
      { name: "Thermal Gland Evacuation & Expression", price: 3500 },
      { name: "Punctal Plug Insertion (Per Eye)", price: 4200 }
    ],
    education: [
      { degree: "MBBS", institution: "Gandhi Medical College, Hyderabad", year: "2014" },
      { degree: "DNB Ophthalmology", institution: "Sarojini Devi Eye Hospital, Hyderabad", year: "2018" }
    ],
    hospital: {
      id: "hosp-4",
      name: "OptiCure Hyderabad Vision Hospital",
      city: "Hyderabad",
      locality: "Hitec City",
      address: "Mindspace Junction, Hitec City, Hyderabad, Telangana 500081",
      phone: "+91 40 4920 4400",
      rating: 4.85
    },
    clinic: {
      id: "clinic-5",
      name: "OptiCure Hitec City Clinic",
      city: "Hyderabad",
      locality: "Hitec City",
      address: "Mindspace Road, Hitec City, Hyderabad",
      phone: "+91 40 4920 4401"
    },
    nextAvailableSlot: {
      date: "Today",
      time: "03:00 PM",
      mode: "ONLINE"
    },
    isVerified: true,
    isFeatured: false
  },
  {
    id: "doc-8",
    slug: "dr-karthik-venkatesh",
    name: "Dr. Karthik Venkatesh",
    title: "Consultant Neuro-Ophthalmologist & Strabismologist",
    gender: "Male",
    profileImage: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400",
    qualifications: ["MBBS", "MS (Ophthalmology)", "Fellowship in Neuro-Ophthalmology (Aravind)"],
    specialization: "Neuro-Ophthalmology & Optic Nerve Disorders",
    subSpecialties: ["Optic Neuritis", "Papilledema", "Myasthenia Gravis", "Cranial Nerve Palsies (3rd/4th/6th)"],
    experienceYears: 13,
    registrationNumber: "TNMC-77412",
    languages: ["English", "Tamil", "Hindi", "Telugu"],
    onlineConsultation: true,
    clinicConsultation: true,
    onlineFee: 850,
    clinicFee: 1100,
    rating: 4.93,
    reviewCount: 310,
    patientsTreated: 5900,
    about: "Dr. Karthik Venkatesh is one of the few specialized Neuro-Ophthalmologists bridging neurology and eye care. He manages unexplained vision loss, double vision, headache associated with vision changes, optic disc swelling, and multiple sclerosis-related optic neuritis.",
    expertise: [
      "Automated Kinetic & Static Visual Field Topography",
      "Optic Nerve Sheath Diameter Ultrasonography",
      "Neurological Pupil Examination & Pharmacological Testing",
      "Prism Prescription for Incurable Diplopia (Double Vision)",
      "Idiopathic Intracranial Hypertension (IIH) Visual Monitoring"
    ],
    servicesOffered: [
      { name: "Complex Neuro-Ophthalmic Examination & Diplopia Charting", price: 1500 },
      { name: "Fresnel Prism Trial & Fitting for Double Vision", price: 2800 },
      { name: "OCT RNFL & Ganglion Cell Complex (GCC) Analysis", price: 1800 }
    ],
    education: [
      { degree: "MBBS", institution: "Stanley Medical College, Chennai", year: "2011" },
      { degree: "MS Ophthalmology", institution: "Madras Medical College, Chennai", year: "2015" },
      { degree: "Fellowship Neuro-Ophthalmology", institution: "Aravind Eye Hospital, Madurai", year: "2017" }
    ],
    hospital: {
      id: "hosp-5",
      name: "OptiCure Chennai Eye Center",
      city: "Chennai",
      locality: "T. Nagar",
      address: "North Usman Road, T. Nagar, Chennai, Tamil Nadu 600017",
      phone: "+91 44 4920 5500",
      rating: 4.9
    },
    clinic: {
      id: "clinic-6",
      name: "OptiCure T. Nagar Clinic",
      city: "Chennai",
      locality: "T. Nagar",
      address: "North Usman Road, T. Nagar, Chennai",
      phone: "+91 44 4920 5501"
    },
    nextAvailableSlot: {
      date: "Tomorrow",
      time: "02:00 PM",
      mode: "ONLINE"
    },
    isVerified: true,
    isFeatured: true
  },
  {
    id: "doc-9",
    slug: "dr-farhan-akhtar",
    name: "Dr. Farhan Akhtar",
    title: "Senior Vitreo-Retinal Surgeon",
    gender: "Male",
    profileImage: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400",
    qualifications: ["MBBS", "MS (Ophthalmology - AIIMS)", "DNB", "FICO"],
    specialization: "Vitreo-Retina & Macular Surgery",
    subSpecialties: ["Retinal Tears", "Diabetic Vitrectomy", "Central Serous Chorioretinopathy (CSCR)"],
    experienceYears: 17,
    registrationNumber: "DMC-52190",
    languages: ["English", "Hindi", "Urdu"],
    onlineConsultation: true,
    clinicConsultation: true,
    onlineFee: 900,
    clinicFee: 1200,
    rating: 4.89,
    reviewCount: 340,
    patientsTreated: 9200,
    about: "Dr. Farhan Akhtar is an alumnus of AIIMS New Delhi with 17+ years of surgical mastery in advanced vitreo-retinal diseases. He has extensive expertise in managing complicated retinal detachments and trauma cases.",
    expertise: [
      "Scleral Buckling & Pneumatic Retinopexy",
      "Photodynamic Therapy (PDT) for CSCR",
      "Vitrectomy for Vitreous Hemorrhage",
      "Macular Pucker Peeling"
    ],
    servicesOffered: [
      { name: "Retina Screening with Digital Fundus Camera", price: 1200 },
      { name: "Retinal Laser Photocoagulation", price: 5000 },
      { name: "Pars Plana Vitrectomy Surgery", price: 55000 }
    ],
    education: [
      { degree: "MBBS", institution: "All India Institute of Medical Sciences (AIIMS), New Delhi", year: "2007" },
      { degree: "MS Ophthalmology", institution: "Dr. R.P. Centre, AIIMS New Delhi", year: "2011" }
    ],
    hospital: {
      id: "hosp-6",
      name: "OptiCure Delhi NCR Eye Hospital",
      city: "Delhi-NCR",
      locality: "South Extension",
      address: "Ring Road, South Extension Part II, New Delhi 110049",
      phone: "+91 11 4920 6600",
      rating: 4.92
    },
    clinic: {
      id: "clinic-7",
      name: "OptiCure South Extension Center",
      city: "Delhi-NCR",
      locality: "South Extension",
      address: "South Extension II, New Delhi",
      phone: "+91 11 4920 6601"
    },
    nextAvailableSlot: {
      date: "Today",
      time: "05:15 PM",
      mode: "ONLINE"
    },
    isVerified: true,
    isFeatured: false
  },
  {
    id: "doc-10",
    slug: "dr-sunita-rao",
    name: "Dr. Sunita Rao",
    title: "Senior Cornea & Refractive Surgeon",
    gender: "Female",
    profileImage: "https://images.unsplash.com/photo-1594824813589-44e21a2c3569?auto=format&fit=crop&q=80&w=400",
    qualifications: ["MBBS", "MS (Ophthalmology)", "Cornea Fellowship (Sankara Nethralaya)"],
    specialization: "Cornea, External Diseases & LASIK",
    subSpecialties: ["Keratoconus", "Fuchs Dystrophy", "Custom PRK", "Dry Eye"],
    experienceYears: 18,
    registrationNumber: "KMC-61029",
    languages: ["English", "Kannada", "Hindi", "Telugu"],
    onlineConsultation: true,
    clinicConsultation: true,
    onlineFee: 750,
    clinicFee: 950,
    rating: 4.91,
    reviewCount: 460,
    patientsTreated: 11000,
    about: "Dr. Sunita Rao has pioneered modern lamellar corneal surgeries in South India. With over 18 years of clinical practice, she is renowned for corneal ulcer salvage, keratoconus management, and personalized refractive surgery.",
    expertise: [
      "Custom Contoura & SMILE LASIK",
      "Deep Anterior Lamellar Keratoplasty (DALK)",
      "Pterygium Excision with Conjunctival Autograft & Fibrin Glue",
      "Amniotic Membrane Dressing for Corneal Perforations"
    ],
    servicesOffered: [
      { name: "Corneal Topography Scan & Keratoconus Evaluation", price: 1400 },
      { name: "SMILE Blade-Free Laser Procedure", price: 90000 },
      { name: "Corneal Cross-Linking (C3R)", price: 27000 }
    ],
    education: [
      { degree: "MBBS", institution: "St. John's Medical College, Bengaluru", year: "2006" },
      { degree: "MS Ophthalmology", institution: "Minto Regional Institute of Ophthalmology, Bengaluru", year: "2010" },
      { degree: "Fellowship Cornea", institution: "Sankara Nethralaya, Chennai", year: "2012" }
    ],
    hospital: {
      id: "hosp-1",
      name: "OptiCure Apex Eye Hospital",
      city: "Bangalore",
      locality: "Indiranagar",
      address: "100 Feet Road, Indiranagar, Bengaluru",
      phone: "+91 80 4920 1100",
      rating: 4.9
    },
    clinic: {
      id: "clinic-8",
      name: "OptiCure Jayanagar Clinic",
      city: "Bangalore",
      locality: "Jayanagar",
      address: "11th Main, 4th Block, Jayanagar, Bengaluru",
      phone: "+91 80 4920 1300"
    },
    nextAvailableSlot: {
      date: "Tomorrow",
      time: "10:00 AM",
      mode: "CLINIC"
    },
    isVerified: true,
    isFeatured: true
  },
  {
    id: "doc-11",
    slug: "dr-arun-swaminathan",
    name: "Dr. Arun Swaminathan",
    title: "Consultant Glaucoma Surgeon & Cataract Specialist",
    gender: "Male",
    profileImage: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400",
    qualifications: ["MBBS", "DO", "DNB", "Glaucoma Fellowship (LVPEI)"],
    specialization: "Glaucoma & Micro-Incision Cataract (MICS)",
    subSpecialties: ["Angle Closure Glaucoma", "Laser Iridoplasty", "Trabeculectomy with MMC", "Phacoemulsification"],
    experienceYears: 11,
    registrationNumber: "KMC-81230",
    languages: ["English", "Tamil", "Kannada", "Hindi"],
    onlineConsultation: true,
    clinicConsultation: true,
    onlineFee: 600,
    clinicFee: 750,
    rating: 4.84,
    reviewCount: 220,
    patientsTreated: 4900,
    about: "Dr. Arun Swaminathan specializes in medical and surgical management of refractory glaucoma. He focuses on comprehensive pressure monitoring, diurnal variations, and vision preservation.",
    expertise: [
      "Trabeculectomy with Mitomycin-C",
      "Gonioscopy-Assisted Transluminal Trabeculotomy (GATT)",
      "Nd:YAG Laser Capsulotomy & Iridotomy",
      "Toric Monofocal IOL Implantation"
    ],
    servicesOffered: [
      { name: "Goldmann Applanation Tonometry & Pachymetry", price: 600 },
      { name: "Nd:YAG Laser Capsulotomy (After-Cataract clearing)", price: 3500 },
      { name: "Glaucoma Trabeculectomy Surgery", price: 30000 }
    ],
    education: [
      { degree: "MBBS", institution: "Madurai Medical College", year: "2013" },
      { degree: "DNB Ophthalmology", institution: "Aravind Eye Hospital", year: "2017" }
    ],
    hospital: {
      id: "hosp-1",
      name: "OptiCure Apex Eye Hospital",
      city: "Bangalore",
      locality: "Indiranagar",
      address: "100 Feet Road, Indiranagar, Bengaluru",
      phone: "+91 80 4920 1100",
      rating: 4.9
    },
    clinic: {
      id: "clinic-9",
      name: "OptiCure Marathahalli Clinic",
      city: "Bangalore",
      locality: "Marathahalli",
      address: "Outer Ring Road, Marathahalli, Bengaluru",
      phone: "+91 80 4920 1400"
    },
    nextAvailableSlot: {
      date: "Today",
      time: "08:00 PM",
      mode: "ONLINE"
    },
    isVerified: true,
    isFeatured: false
  },
  {
    id: "doc-12",
    slug: "dr-neha-joshi",
    name: "Dr. Neha Joshi",
    title: "Consultant Pediatric Ophthalmologist",
    gender: "Female",
    profileImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400",
    qualifications: ["MBBS", "MS (Ophthalmology)", "Pediatric Fellowship (LVPEI)"],
    specialization: "Pediatric Ophthalmology & Squint",
    subSpecialties: ["Childhood Myopia Progression", "Atropine Drop Therapy", "Squint Alignment", "Pediatric Eye Checkup"],
    experienceYears: 9,
    registrationNumber: "MMC-76541",
    languages: ["English", "Marathi", "Hindi"],
    onlineConsultation: true,
    clinicConsultation: true,
    onlineFee: 650,
    clinicFee: 800,
    rating: 4.9,
    reviewCount: 280,
    patientsTreated: 4500,
    about: "Dr. Neha Joshi focuses on managing progressive myopia in school children using low-dose atropine therapy, special defocus glasses, and lifestyle interventions, ensuring young minds see clearly.",
    expertise: [
      "Low-Dose Atropine Myopia Control Protocols",
      "Non-Cycloplegic & Cycloplegic Pediatric Refraction",
      "Infant Red Reflex Screening",
      "Orthoptic Exercises for Convergence Insufficiency"
    ],
    servicesOffered: [
      { name: "Comprehensive Child Eye Exam & Myopia Risk Profiling", price: 850 },
      { name: "Binocular Vision & Squint Assessment", price: 1200 },
      { name: "Myopia Control Follow-Up Plan", price: 2500 }
    ],
    education: [
      { degree: "MBBS", institution: "BJ Government Medical College, Pune", year: "2015" },
      { degree: "MS Ophthalmology", institution: "KEM Hospital, Mumbai", year: "2019" }
    ],
    hospital: {
      id: "hosp-3",
      name: "OptiCure Mumbai Eye Foundation",
      city: "Mumbai",
      locality: "Bandra West",
      address: "Turner Road, Bandra West, Mumbai",
      phone: "+91 22 4920 3300",
      rating: 4.95
    },
    clinic: {
      id: "clinic-4",
      name: "OptiCure Bandra Premier Clinic",
      city: "Mumbai",
      locality: "Bandra West",
      address: "Turner Road, Bandra West, Mumbai",
      phone: "+91 22 4920 3301"
    },
    nextAvailableSlot: {
      date: "Tomorrow",
      time: "03:30 PM",
      mode: "CLINIC"
    },
    isVerified: true,
    isFeatured: false
  }
];

export const CITIES = [
  { name: "Bangalore", localities: ["Indiranagar", "Koramangala", "Whitefield", "Jayanagar", "Marathahalli", "Electronic City"] },
  { name: "Mumbai", localities: ["Bandra West", "Andheri East", "Powai", "South Mumbai"] },
  { name: "Delhi-NCR", localities: ["South Extension", "Gurgaon Sector 29", "Noida Sector 62"] },
  { name: "Hyderabad", localities: ["Hitec City", "Banjara Hills", "Jubilee Hills", "Gachibowli"] },
  { name: "Chennai", localities: ["T. Nagar", "Adyar", "Anna Nagar", "Velachery"] },
  { name: "Pune", localities: ["Koregaon Park", "Baner", "Viman Nagar", "Kothrud"] }
];
