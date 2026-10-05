"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  SlidersHorizontal,
  X,
  Star,
  Clock,
  Video,
  Building2,
  ChevronDown,
  RotateCcw,
  Sparkles,
  Check
} from "lucide-react";
import { DOCTORS, CITIES } from "@/lib/data/doctors";
import { EYE_SPECIALTIES } from "@/lib/data/specialties";
import DoctorCard from "@/components/doctors/DoctorCard";
import { Doctor } from "@/types";

function DoctorListingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL state
  const queryParam = searchParams.get("q") || "";
  const cityParam = searchParams.get("city") || searchParams.get("location") || "";
  const specialtyParam = searchParams.get("specialty") || "";
  const modeParam = searchParams.get("mode") || "all"; // all, online, clinic
  const expParam = searchParams.get("exp") || "0";
  const maxFeeParam = searchParams.get("maxFee") || "2000";
  const minRatingParam = searchParams.get("rating") || "0";
  const genderParam = searchParams.get("gender") || "all";
  const sortParam = searchParams.get("sort") || "relevance";

  // Local filter states
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedCity, setSelectedCity] = useState(cityParam);
  const [selectedSpecialty, setSelectedSpecialty] = useState(specialtyParam);
  const [selectedMode, setSelectedMode] = useState<string>(modeParam);
  const [minExp, setMinExp] = useState<number>(Number(expParam) || 0);
  const [maxFee, setMaxFee] = useState<number>(Number(maxFeeParam) || 2000);
  const [minRating, setMinRating] = useState<number>(Number(minRatingParam) || 0);
  const [selectedGender, setSelectedGender] = useState<string>(genderParam);
  const [sortBy, setSortBy] = useState<string>(sortParam);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync state to URL
  const updateUrlFilters = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, val]) => {
      if (val && val !== "all" && val !== "0") {
        params.set(key, val);
      } else {
        params.delete(key);
      }
    });
    router.replace(`/doctors?${params.toString()}`, { scroll: false });
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCity("");
    setSelectedSpecialty("");
    setSelectedMode("all");
    setMinExp(0);
    setMaxFee(2000);
    setMinRating(0);
    setSelectedGender("all");
    setSortBy("relevance");
    router.replace("/doctors", { scroll: false });
  };

  // Filtered and sorted doctors
  const filteredDoctors = useMemo(() => {
    return DOCTORS.filter((doc) => {
      // 1. Text Search across name, qualifications, specialties, subSpecialties, and hospital
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = doc.name.toLowerCase().includes(q);
        const matchesSpec = doc.specialization.toLowerCase().includes(q);
        const matchesSub = doc.subSpecialties.some((s) => s.toLowerCase().includes(q));
        const matchesHospital = doc.hospital.name.toLowerCase().includes(q) || doc.hospital.locality.toLowerCase().includes(q);
        const matchesQual = doc.qualifications.some((d) => d.toLowerCase().includes(q));
        if (!matchesName && !matchesSpec && !matchesSub && !matchesHospital && !matchesQual) {
          return false;
        }
      }

      // 2. City Filter
      if (selectedCity && selectedCity !== "all") {
        if (doc.hospital.city.toLowerCase() !== selectedCity.toLowerCase()) {
          return false;
        }
      }

      // 3. Specialty Filter
      if (selectedSpecialty && selectedSpecialty !== "all") {
        const specLower = selectedSpecialty.toLowerCase();
        const matchesSpec = doc.specialization.toLowerCase().includes(specLower);
        const matchesSub = doc.subSpecialties.some((s) => s.toLowerCase().includes(specLower));
        if (!matchesSpec && !matchesSub) return false;
      }

      // 4. Consultation Mode
      if (selectedMode === "online" && !doc.onlineConsultation) return false;
      if (selectedMode === "clinic" && !doc.clinicConsultation) return false;

      // 5. Experience
      if (doc.experienceYears < minExp) return false;

      // 6. Max Fee
      const relevantFee = selectedMode === "clinic" ? doc.clinicFee : doc.onlineFee;
      if (relevantFee > maxFee) return false;

      // 7. Rating
      if (doc.rating < minRating) return false;

      // 8. Gender
      if (selectedGender !== "all" && doc.gender.toLowerCase() !== selectedGender.toLowerCase()) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "experience") return b.experienceYears - a.experienceYears;
      if (sortBy === "fee-asc") return a.onlineFee - b.onlineFee;
      if (sortBy === "fee-desc") return b.onlineFee - a.onlineFee;
      return b.reviewCount - a.reviewCount; // relevance
    });
  }, [
    searchQuery,
    selectedCity,
    selectedSpecialty,
    selectedMode,
    minExp,
    maxFee,
    minRating,
    selectedGender,
    sortBy
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Top Breadcrumb & Page Heading */}
      <div className="mb-6 space-y-2">
        <div className="text-xs text-slate-500 flex items-center gap-1.5">
          <span>Home</span>
          <span>/</span>
          <span className="text-slate-800 font-semibold">Ophthalmologists</span>
          {selectedCity && (
            <>
              <span>/</span>
              <span className="text-teal-700 font-semibold">{selectedCity}</span>
            </>
          )}
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              Verified Ophthalmologists & Eye Surgeons
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Showing <strong>{filteredDoctors.length}</strong> certified eye specialists available for consultation
            </p>
          </div>

          {/* Quick Sort Dropdown */}
          <div className="flex items-center gap-3">
            <label className="text-xs font-semibold text-slate-500 shrink-0">Sort By:</label>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  updateUrlFilters({ sort: e.target.value });
                }}
                className="pl-3 pr-8 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:ring-2 focus:ring-teal-600 appearance-none cursor-pointer"
              >
                <option value="relevance">Relevance & Trust</option>
                <option value="rating">Highest Rated (★ 4.9+)</option>
                <option value="experience">Experience (High to Low)</option>
                <option value="fee-asc">Fee: Low to High</option>
                <option value="fee-desc">Fee: High to Low</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Mobile Filter Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl bg-teal-600 text-white text-xs font-semibold shadow-xs"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar + Doctor Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-4 bg-white rounded-2xl border border-slate-200/90 p-5 subtle-shadow space-y-6 sticky top-28">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
              <SlidersHorizontal className="w-4 h-4 text-teal-600" />
              <span>Filters</span>
            </div>
            <button
              type="button"
              onClick={resetFilters}
              className="text-xs text-teal-700 hover:text-teal-800 font-semibold flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Reset All
            </button>
          </div>

          {/* Keyword Search */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Search Doctor or Condition</label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  updateUrlFilters({ q: e.target.value });
                }}
                placeholder="e.g. Dr. Arundhati, Cataract, LASIK"
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Location / City */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">City / Region</label>
            <select
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                updateUrlFilters({ city: e.target.value });
              }}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:ring-2 focus:ring-teal-600 focus:outline-hidden bg-white"
            >
              <option value="">All Cities</option>
              {CITIES.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Consultation Type */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Consultation Type</label>
            <div className="grid grid-cols-3 gap-1.5 text-xs">
              {[
                { id: "all", label: "All" },
                { id: "online", label: "Video" },
                { id: "clinic", label: "In-Clinic" }
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    setSelectedMode(m.id);
                    updateUrlFilters({ mode: m.id });
                  }}
                  className={`py-1.5 px-2 rounded-lg font-semibold text-center transition-all ${
                    selectedMode === m.id
                      ? "bg-teal-600 text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Ophthalmic Sub-Specialties */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Sub-Specialty</label>
            <div className="space-y-1 max-h-48 overflow-y-auto custom-scrollbar pr-1">
              <button
                type="button"
                onClick={() => {
                  setSelectedSpecialty("");
                  updateUrlFilters({ specialty: "" });
                }}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                  !selectedSpecialty
                    ? "font-bold text-teal-700 bg-teal-50"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                All Eye Specialties
              </button>
              {EYE_SPECIALTIES.map((spec) => {
                const isSelected = selectedSpecialty === spec.slug;
                return (
                  <button
                    key={spec.slug}
                    type="button"
                    onClick={() => {
                      const next = isSelected ? "" : spec.slug;
                      setSelectedSpecialty(next);
                      updateUrlFilters({ specialty: next });
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                      isSelected
                        ? "font-bold text-teal-700 bg-teal-50"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span>{spec.name}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-teal-600" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Experience Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-700">Minimum Experience</label>
              <span className="font-bold text-teal-700">{minExp}+ Years</span>
            </div>
            <input
              type="range"
              min={0}
              max={20}
              step={2}
              value={minExp}
              onChange={(e) => {
                const val = Number(e.target.value);
                setMinExp(val);
                updateUrlFilters({ exp: String(val) });
              }}
              className="w-full accent-teal-600 cursor-pointer"
            />
          </div>

          {/* Max Consultation Fee */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-700">Max Consultation Fee</label>
              <span className="font-bold text-teal-700">₹{maxFee}</span>
            </div>
            <input
              type="range"
              min={400}
              max={1500}
              step={100}
              value={maxFee}
              onChange={(e) => {
                const val = Number(e.target.value);
                setMaxFee(val);
                updateUrlFilters({ maxFee: String(val) });
              }}
              className="w-full accent-teal-600 cursor-pointer"
            />
          </div>

          {/* Rating Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Doctor Rating</label>
            <div className="flex gap-2">
              {[0, 4.5, 4.8].map((rate) => (
                <button
                  key={rate}
                  type="button"
                  onClick={() => {
                    setMinRating(rate);
                    updateUrlFilters({ rating: String(rate) });
                  }}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border ${
                    minRating === rate
                      ? "border-teal-600 bg-teal-50 text-teal-800"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {rate === 0 ? "Any" : `★ ${rate}+`}
                </button>
              ))}
            </div>
          </div>

          {/* Doctor Gender */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Gender</label>
            <div className="flex gap-2">
              {[
                { id: "all", label: "Any" },
                { id: "female", label: "Female" },
                { id: "male", label: "Male" }
              ].map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => {
                    setSelectedGender(g.id);
                    updateUrlFilters({ gender: g.id });
                  }}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border ${
                    selectedGender === g.id
                      ? "border-teal-600 bg-teal-50 text-teal-800"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Doctor Results Column */}
        <main className="lg:col-span-8 space-y-5">
          {/* Active Filter Badges */}
          {(searchQuery || selectedCity || selectedSpecialty || selectedMode !== "all" || minExp > 0 || maxFee < 2000) && (
            <div className="flex flex-wrap items-center gap-2 p-3 bg-white rounded-xl border border-slate-200 text-xs">
              <span className="font-semibold text-slate-500">Active Filters:</span>
              {searchQuery && (
                <span className="px-2 py-1 rounded-md bg-teal-50 text-teal-800 border border-teal-200 flex items-center gap-1">
                  Query: "{searchQuery}"
                  <button onClick={() => { setSearchQuery(""); updateUrlFilters({ q: "" }); }}>
                    <X className="w-3 h-3 hover:text-teal-900" />
                  </button>
                </span>
              )}
              {selectedCity && (
                <span className="px-2 py-1 rounded-md bg-teal-50 text-teal-800 border border-teal-200 flex items-center gap-1">
                  City: {selectedCity}
                  <button onClick={() => { setSelectedCity(""); updateUrlFilters({ city: "" }); }}>
                    <X className="w-3 h-3 hover:text-teal-900" />
                  </button>
                </span>
              )}
              {selectedSpecialty && (
                <span className="px-2 py-1 rounded-md bg-teal-50 text-teal-800 border border-teal-200 flex items-center gap-1">
                  Specialty: {selectedSpecialty}
                  <button onClick={() => { setSelectedSpecialty(""); updateUrlFilters({ specialty: "" }); }}>
                    <X className="w-3 h-3 hover:text-teal-900" />
                  </button>
                </span>
              )}
              {selectedMode !== "all" && (
                <span className="px-2 py-1 rounded-md bg-teal-50 text-teal-800 border border-teal-200 flex items-center gap-1">
                  Mode: {selectedMode === "online" ? "Video" : "Clinic"}
                  <button onClick={() => { setSelectedMode("all"); updateUrlFilters({ mode: "all" }); }}>
                    <X className="w-3 h-3 hover:text-teal-900" />
                  </button>
                </span>
              )}
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs text-rose-600 font-semibold hover:underline ml-auto"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Doctors List */}
          {filteredDoctors.length > 0 ? (
            <div className="space-y-4">
              {filteredDoctors.map((doc) => (
                <DoctorCard key={doc.id} doctor={doc} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-2xl p-10 border border-slate-200 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">
                No eye doctors match your current criteria
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                Try broadening your filters, clearing the city filter, or checking under another ophthalmic sub-specialty.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-all shadow-xs"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Slide-Over Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-slate-900/60 backdrop-blur-xs">
          <div className="ml-auto w-full max-w-xs bg-white h-full p-5 overflow-y-auto space-y-6 shadow-2xl animate-in slide-in-from-right">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-base text-slate-900">Filters</h3>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* City */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">City</label>
              <select
                value={selectedCity}
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                  updateUrlFilters({ city: e.target.value });
                }}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
              >
                <option value="">All Cities</option>
                {CITIES.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Mode */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Consultation Mode</label>
              <div className="grid grid-cols-3 gap-1 text-xs">
                {["all", "online", "clinic"].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => {
                      setSelectedMode(m);
                      updateUrlFilters({ mode: m });
                    }}
                    className={`py-1.5 rounded-lg font-semibold capitalize ${
                      selectedMode === m ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full py-3 rounded-xl bg-teal-600 text-white text-xs font-bold shadow-md"
            >
              Show {filteredDoctors.length} Doctors
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DoctorListingPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-slate-200 rounded-md w-1/3 mx-auto"></div>
            <div className="h-4 bg-slate-200 rounded-md w-1/4 mx-auto"></div>
          </div>
        </div>
      }
    >
      <DoctorListingContent />
    </Suspense>
  );
}
