import { SpecialityInfo } from "@/types";

export const EYE_SPECIALTIES: SpecialityInfo[] = [
  {
    slug: "cataract-refractive",
    name: "Cataract & Refractive Surgery",
    tagline: "Restore clear vision with advanced blade-free laser and premium intraocular lenses.",
    description: "Cataract surgery replaces the cloudy natural lens of the eye with an artificial intraocular lens (IOL). Refractive surgery corrects myopia, hyperopia, and astigmatism to eliminate glasses dependence.",
    commonConditions: [
      "Nuclear / Cortical Cataract",
      "Age-Related Lens Clouding",
      "Post-Surgical Posterior Capsule Opacification",
      "Myopia (Nearsightedness)",
      "Astigmatism"
    ],
    keySymptoms: [
      "Cloudy, blurry, or dim vision",
      "Increased glare and halos around headlights at night",
      "Frequent changes in eyeglass prescription",
      "Double vision in a single eye",
      "Colors appearing faded or yellowed"
    ],
    diagnosticProcedures: [
      "Optical Biometry & IOL Master Calculation",
      "Corneal Topography & Tomography (Pentacam)",
      "Specular Microscopy (Endothelial Cell Count)",
      "Slit-lamp Biomicroscopy with Dilated Pupil Exam"
    ],
    iconName: "Eye"
  },
  {
    slug: "vitreo-retina",
    name: "Vitreo-Retina & Macular Care",
    tagline: "Specialized care for diabetes-related eye changes, retinal detachment, and macular health.",
    description: "The retina is the light-sensitive tissue lining the back of your eye. Retinal specialists treat delicate micro-vascular diseases, retinal tears, hemorrhages, and age-related macular degeneration.",
    commonConditions: [
      "Diabetic Retinopathy & Macular Edema",
      "Retinal Detachment & Retinal Tears",
      "Age-Related Macular Degeneration (Dry & Wet AMD)",
      "Central / Branch Retinal Vein Occlusion (CRVO/BRVO)",
      "Epiretinal Membrane & Macular Hole"
    ],
    keySymptoms: [
      "Sudden showers of new floaters or spiderweb threads",
      "Flashes of bright light in peripheral vision",
      "A dark curtain or shadow falling across part of vision",
      "Distorted straight lines (metamorphopsia)",
      "Dark empty spot in center of vision"
    ],
    diagnosticProcedures: [
      "High-Definition Optical Coherence Tomography (OCT)",
      "Fundus Fluorescein Angiography (FFA)",
      "Ultra-widefield Retinal Fundus Imaging",
      "B-Scan Ophthalmic Ultrasonography"
    ],
    iconName: "Sparkles"
  },
  {
    slug: "cornea-external",
    name: "Cornea & External Eye Disease",
    tagline: "Expert diagnosis and surgical management of corneal dystrophies, infections, and keratoconus.",
    description: "The cornea is the clear protective outer dome of the eye. Our cornea specialists manage severe infections, keratoconus, dry eye syndrome, and perform corneal transplants.",
    commonConditions: [
      "Keratoconus & Corneal Ectasia",
      "Bacterial & Fungal Corneal Ulcers",
      "Fuchs Endothelial Corneal Dystrophy",
      "Severe Dry Eye Disease & Meibomian Gland Dysfunction",
      "Pterygium & Corneal Scarring"
    ],
    keySymptoms: [
      "Severe eye pain, redness, and grittiness",
      "Sensitivity to bright light (photophobia)",
      "Constant tearing or foreign-body sensation",
      "White spot visible on the clear window of the eye",
      "Ghost images or halos around lights"
    ],
    diagnosticProcedures: [
      "Corneal Pachymetry & Epithelial Thickness Mapping",
      "Anterior Segment OCT (AS-OCT)",
      "Tear Film Break-up Time (TBUT) & Schirmer Test",
      "Corneal Scraping & Microbiological Culture"
    ],
    iconName: "Layers"
  },
  {
    slug: "glaucoma",
    name: "Glaucoma & Optic Nerve Health",
    tagline: "Silent vision thief prevention through early intraocular pressure monitoring and laser intervention.",
    description: "Glaucoma is a group of eye conditions that damage the optic nerve, often caused by abnormally high pressure inside the eye. Early detection is critical to preventing permanent vision loss.",
    commonConditions: [
      "Primary Open-Angle Glaucoma (POAG)",
      "Primary Angle-Closure Glaucoma (PACG)",
      "Normal Tension Glaucoma",
      "Ocular Hypertension",
      "Secondary Glaucoma (Steroid-induced / Neovascular)"
    ],
    keySymptoms: [
      "Often symptomless in early stages ('Silent thief of sight')",
      "Gradual loss of peripheral (side) vision (tunnel vision)",
      "Severe eye pain with headache, nausea, and vomiting (acute attack)",
      "Rainbow-colored halos around bright light sources",
      "Redness of the eye with dilated pupil"
    ],
    diagnosticProcedures: [
      "Goldmann Applanation Tonometry (IOP Measurement)",
      "Humphrey Automated Visual Field (HVF Perimetry)",
      "RNFL Optical Coherence Tomography (Optic Nerve Scan)",
      "Four-Mirror Gonioscopy (Drainage Angle Assessment)"
    ],
    iconName: "Activity"
  },
  {
    slug: "pediatric-squint",
    name: "Pediatric Ophthalmology & Squint",
    tagline: "Dedicated child vision preservation, amblyopia management, and adult strabismus alignment.",
    description: "Children's visual systems develop rapidly until age 8. Pediatric ophthalmologists treat lazy eye (amblyopia), misaligned eyes (squint/strabismus), pediatric cataracts, and genetic eye disorders.",
    commonConditions: [
      "Amblyopia (Lazy Eye)",
      "Strabismus / Squint (Esotropia / Exotropia)",
      "Congenital Nasolacrimal Duct Obstruction (Watery eyes)",
      "Pediatric Cataract & Glaucoma",
      "Retinopathy of Prematurity (ROP)"
    ],
    keySymptoms: [
      "Eyes not pointing in the same direction",
      "Tilting head or squinting when trying to focus",
      "Frequent eye rubbing or blinking excessively",
      "White reflection in the pupil in flash photos (leukocoria)",
      "Difficulty tracking objects or hand-eye coordination issues"
    ],
    diagnosticProcedures: [
      "Cycloplegic Refraction with Retinoscopy",
      "Prism Cover Test & Alternate Cover Test",
      "Stereopsis & Depth Perception Testing",
      "Binocular Indirect Ophthalmoscopy for Infants"
    ],
    iconName: "HeartHandshake"
  },
  {
    slug: "oculoplasty-aesthetic",
    name: "Oculoplasty & Orbital Surgery",
    tagline: "Cosmetic and reconstructive surgery of eyelids, tear ducts, orbit, and facial aesthetics.",
    description: "Oculoplastic surgeons specialize in plastic and reconstructive surgery around the eyes, managing drooping eyelids (ptosis), eyelid tumors, orbital fractures, and watery tear duct blockages.",
    commonConditions: [
      "Ptosis (Drooping Eyelids)",
      "Entropion / Ectropion (Inward/Outward Turned Eyelids)",
      "Blocked Tear Ducts (Dacryocystitis)",
      "Thyroid Eye Disease (Graves Orbitopathy)",
      "Orbital Trauma and Eyelid Tumors"
    ],
    keySymptoms: [
      "Heavy, drooping upper eyelids obstructing visual field",
      "Persistent tearing overflowing onto the cheeks",
      "Eyelashes scratching the eyeball surface",
      "Bulging or protruding eyes (proptosis)",
      "Lump or non-healing ulcer on the eyelid"
    ],
    diagnosticProcedures: [
      "MRD-1 and Levator Palpebrae Superioris Action Testing",
      "Syringing and Probing of Lacrimal Passage",
      "Exophthalmometry (Hertel)",
      "High-Resolution Orbit CT / MRI Imaging"
    ],
    iconName: "ShieldCheck"
  },
  {
    slug: "lasik-refractive",
    name: "LASIK & Vision Correction",
    tagline: "Freedom from eyeglasses with advanced Femto-LASIK, SMILE, and Contoura Vision.",
    description: "State-of-the-art laser vision correction reshaping the corneal surface for ultra-sharp, glasses-free vision within hours.",
    commonConditions: [
      "High Myopia (up to -12.00 D)",
      "Hyperopia (Farsightedness)",
      "Compound Myopic Astigmatism",
      "Contact Lens Intolerance"
    ],
    keySymptoms: [
      "Dependence on spectacles for sports and daily life",
      "Dry eyes or irritation from contact lenses",
      "Difficulty reading signs at a distance"
    ],
    diagnosticProcedures: [
      "Contoura Vision Wavefront Aberrometry",
      "Corneal Biomechanics (Corvis ST)",
      "Pupillometry and Dry Eye Screening"
    ],
    iconName: "Zap"
  },
  {
    slug: "dry-eye-clinic",
    name: "Advanced Dry Eye & Digital Strain",
    tagline: "Specialized diagnostics and thermal pulsation therapies for computer vision syndrome.",
    description: "Dry eye syndrome affects millions of digital device users. We evaluate tear film quality and meibomian gland health to provide targeted, lasting relief.",
    commonConditions: [
      "Evaporative Dry Eye",
      "Computer Vision Syndrome (CVS)",
      "Meibomian Gland Dysfunction (MGD)",
      "Aqueous Deficient Dry Eye (Sjogren Syndrome)"
    ],
    keySymptoms: [
      "Burning, stinging, or gritty sensation in eyes",
      "Fluctuating blurry vision cleared by blinking",
      "Paradoxical excessive tearing in response to wind or air conditioning",
      "Tired, heavy eyes after screen usage"
    ],
    diagnosticProcedures: [
      "Non-Invasive Tear Film Break-Up Time (NIBUT)",
      "Infrared Meibography Gland Imaging",
      "Tear Film Osmolarity Testing",
      "Ocular Surface Interferometry (Lipid Layer Thickness)"
    ],
    iconName: "Droplets"
  }
];

export const POPULAR_CONDITIONS = [
  { name: "Cataract", slug: "cataract-refractive", icon: "Eye", count: 18 },
  { name: "Diabetic Retinopathy", slug: "vitreo-retina", icon: "Sparkles", count: 14 },
  { name: "Glaucoma / High Eye Pressure", slug: "glaucoma", icon: "Activity", count: 12 },
  { name: "LASIK & Spectacle Removal", slug: "lasik-refractive", icon: "Zap", count: 16 },
  { name: "Dry Eyes & Screen Strain", slug: "dry-eye-clinic", icon: "Droplets", count: 20 },
  { name: "Squint & Lazy Eye (Child)", slug: "pediatric-squint", icon: "HeartHandshake", count: 9 },
  { name: "Conjunctivitis (Pink Eye)", slug: "cornea-external", icon: "Layers", count: 22 },
  { name: "Drooping Eyelids (Ptosis)", slug: "oculoplasty-aesthetic", icon: "ShieldCheck", count: 8 },
];
