import { Prescription } from "@/types";

export const SAMPLE_PRESCRIPTIONS: Prescription[] = [
  {
    id: "rx-101",
    prescriptionNumber: "OPT-RX-2026-8812",
    appointmentId: "apt-101",
    doctorId: "doc-1",
    doctorName: "Dr. Arundhati Deshmukh",
    doctorRegNumber: "KMC-64812",
    doctorQualifications: "MBBS, MS (Ophthalmology), Fellowship Vitreo-Retina, FRCS (Glasgow)",
    patientId: "pat-1",
    patientName: "Rahul Sharma",
    patientAge: 38,
    patientGender: "Male",
    date: "04 October 2026",
    diagnosis: "Moderate Non-Proliferative Diabetic Retinopathy (NPDR) with Mild Diabetic Macular Edema (DME) OD > OS",
    clinicalNotes: "Fundus examination shows microaneurysms and hard exudates in macula of Right eye. Left eye shows few scattered dot hemorrhages. Foveal contour preserved in OS. Clear crystalline lens bilaterally.",
    refractionRight: {
      sphere: "-2.25",
      cylinder: "-0.75",
      axis: "90°",
      va: "6/9"
    },
    refractionLeft: {
      sphere: "-2.00",
      cylinder: "-0.50",
      axis: "85°",
      va: "6/6"
    },
    iopOd: "15 mmHg",
    iopOs: "14 mmHg",
    medications: [
      {
        name: "Nepafenac 0.1% Ophthalmic Suspension",
        form: "Eye Drops",
        dosage: "1 drop",
        frequency: "3 times a day (TID)",
        eye: "OD (Right Eye)",
        duration: "30 days",
        instructions: "Instill into right eye only after gentle shaking."
      },
      {
        name: "Carboxymethylcellulose 0.5% (Preservative-Free)",
        form: "Eye Drops",
        dosage: "1 drop",
        frequency: "4 times a day (QID)",
        eye: "OU (Both Eyes)",
        duration: "Ongoing",
        instructions: "Keep 10 minutes interval between different eye drops."
      },
      {
        name: "Tab. Bilberry Extract with Lutein & Zeaxanthin",
        form: "Tablet",
        dosage: "1 tablet",
        frequency: "Once daily after dinner",
        eye: "OU (Both Eyes)",
        duration: "60 days",
        instructions: "Retinal nutritional support."
      }
    ],
    advice: [
      "Strict glycemic control: Target HbA1c < 6.8%",
      "Maintain Blood Pressure below 130/80 mmHg",
      "Repeat Optical Coherence Tomography (OCT) in 6 weeks to monitor retinal thickness",
      "Urgent review if sudden showers of floaters, flashes, or dark shadow appears in vision field",
      "Follow the 20-20-20 rule during screen usage"
    ],
    followUpDate: "15 November 2026",
    signatureUrl: "/signatures/dr-arundhati.png"
  },
  {
    id: "rx-102",
    prescriptionNumber: "OPT-RX-2026-7240",
    appointmentId: "apt-102",
    doctorId: "doc-2",
    doctorName: "Dr. Vikram Sengupta",
    doctorRegNumber: "KMC-58210",
    doctorQualifications: "MBBS, MS (Ophthalmology - AIIMS New Delhi), Cornea Fellowship (LVPEI), FICO",
    patientId: "pat-1",
    patientName: "Rahul Sharma",
    patientAge: 38,
    patientGender: "Male",
    date: "12 August 2026",
    diagnosis: "Bilateral Moderate Evaporative Dry Eye Disease & Meibomian Gland Dysfunction (Grade 2)",
    clinicalNotes: "Tear Break-Up Time (TBUT): OD 4s, OS 5s. Fluorescein staining reveals inferior corneal punctate epitheliopathy. Meibum expression cloudy and viscous.",
    refractionRight: {
      sphere: "-2.25",
      cylinder: "-0.75",
      axis: "90°",
      va: "6/6"
    },
    refractionLeft: {
      sphere: "-2.00",
      cylinder: "-0.50",
      axis: "85°",
      va: "6/6"
    },
    iopOd: "16 mmHg",
    iopOs: "15 mmHg",
    medications: [
      {
        name: "Cyclosporine 0.05% Nano-Emulsion",
        form: "Eye Drops",
        dosage: "1 drop",
        frequency: "Twice daily (BD) 12 hours apart",
        eye: "OU (Both Eyes)",
        duration: "90 days",
        instructions: "Mild transient stinging may occur upon initial instillation."
      },
      {
        name: "Sodium Hyaluronate 0.18% Lubricating Eye Drops",
        form: "Eye Drops",
        dosage: "1 drop",
        frequency: "Every 3 hours while working on screens",
        eye: "OU (Both Eyes)",
        duration: "Ongoing",
        instructions: "Preservative-free single-dose vials."
      },
      {
        name: "Warm Compressing Gel Eye Mask",
        form: "Eye Drops",
        dosage: "Apply 10 minutes",
        frequency: "Twice daily",
        eye: "OU (Both Eyes)",
        duration: "Ongoing",
        instructions: "Warm compress followed by gentle vertical eyelid massage."
      }
    ],
    advice: [
      "Position monitors 20° below eye level to minimize exposed ocular surface area",
      "Avoid direct air-conditioning drafts facing the face",
      "Stay hydrated with minimum 2.5L water daily"
    ],
    followUpDate: "12 November 2026"
  }
];
