/**
 * TeacherCard Component
 * Elegant instructor profile card with Euforyc Studios brand design
 */

import React from 'react';
import {
  User,
  Award,
  Star,
  Instagram,
  ExternalLink,
  Heart,
  Quote,
  BookOpen,
} from 'lucide-react';
import { MomenceTeacher } from '@/lib/types/momence';

interface TeacherCardProps {
  teacher: MomenceTeacher;
  featured?: boolean;
}

export default function TeacherCard({ teacher, featured = false }: TeacherCardProps) {
  // Fallback image for teachers without profile photos
  const profileImage = teacher.profileImageUrl || null;

  return (
    <div
      className={`group relative rounded-3xl p-8 md:p-10 bg-white
        shadow-[0_4px_20px_rgba(26,38,14,0.08)]
        hover:shadow-[0_20px_60px_rgba(26,38,14,0.15)]
        hover:-translate-y-3 hover:scale-[1.02]
        border border-[#1a260e]/5
        transition-all duration-500 ease-out
        overflow-hidden
        ${featured ? 'ring-2 ring-[#1a260e]/20 ring-offset-4' : ''}
      `}
    >
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`
        }}
      />

      {/* Featured Badge */}
      {featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 animate-fade-down">
          <div className="bg-gradient-to-r from-[#1a260e] via-[#2a3a21] to-[#1a260e] text-white px-5 py-2.5 rounded-full text-xs font-bold tracking-[0.1em] uppercase flex items-center shadow-[0_8px_20px_rgba(26,38,14,0.3)]">
            <Star className="w-4 h-4 mr-2" />
            Featured
          </div>
        </div>
      )}

      {/* Profile Image */}
      <div className="text-center mb-8 relative z-10">
        <div className="relative inline-block">
          {profileImage ? (
            <img
              src={profileImage}
              alt={`${teacher.name} - Instructor at Euforyc Studios`}
              className="w-32 h-32 md:w-36 md:h-36 rounded-full object-cover border-4 border-[#fffcf2]
                shadow-[0_8px_30px_rgba(26,38,14,0.15)]
                group-hover:scale-110 group-hover:shadow-[0_12px_40px_rgba(26,38,14,0.25)]
                transition-all duration-500"
            />
          ) : (
            <div className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-[#1a260e]/5 to-[#1a260e]/10 border-4 border-[#fffcf2]
              shadow-[0_8px_30px_rgba(26,38,14,0.15)]
              flex items-center justify-center
              group-hover:scale-110 group-hover:shadow-[0_12px_40px_rgba(26,38,14,0.25)]
              transition-all duration-500">
              <User className="w-16 h-16 text-[#1a260e]" />
            </div>
          )}

          {/* Active indicator with pulse */}
          {teacher.isActive && (
            <div className="absolute bottom-3 right-3">
              <div className="relative flex h-5 w-5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-5 w-5 bg-green-500 border-2 border-white"></span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Name - First Name Only */}
      <h3 className="font-serif text-2xl md:text-3xl font-light text-[#1a260e] text-center mb-3 leading-tight tracking-tight
        group-hover:text-[#2a3a21] transition-colors duration-300">
        {teacher.name.split(' ')[0]}
      </h3>

      {/* Short Bio */}
      {teacher.shortBio && (
        <p className="text-sm text-[#1a260e]/70 text-center font-medium mb-6 tracking-wide uppercase">
          {teacher.shortBio}
        </p>
      )}

      {/* Rating & Reviews */}
      {teacher.rating && teacher.reviewCount && (
        <div className="flex items-center justify-center gap-2 mb-8 px-4 py-2.5 bg-[#fffcf2]/80 rounded-xl">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(teacher.rating || 0)
                    ? 'text-yellow-500 fill-yellow-500'
                    : 'text-[#1a260e]/20'
                  }`}
              />
            ))}
          </div>
          <span className="text-sm text-[#1a260e] font-medium">
            {teacher.rating.toFixed(1)} ({teacher.reviewCount})
          </span>
        </div>
      )}

      {/* Specialties */}
      {teacher.specialties && teacher.specialties.length > 0 && (
        <div className="mb-7 relative z-10">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-full bg-[#1a260e]/5 flex items-center justify-center">
              <Heart className="w-4 h-4 text-[#1a260e]" />
            </div>
            <h4 className="font-sans text-xs font-bold text-[#1a260e]/50 uppercase tracking-[0.15em]">
              Specialties
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {teacher.specialties.slice(0, 4).map((specialty, index) => (
              <span
                key={index}
                className="inline-block bg-[#1a260e]/5 text-[#1a260e] px-3 py-1.5 rounded-full text-xs font-semibold border border-[#1a260e]/10"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {teacher.certifications && teacher.certifications.length > 0 && (
        <div className="mb-7 relative z-10">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-full bg-[#1a260e]/5 flex items-center justify-center">
              <Award className="w-4 h-4 text-[#1a260e]" />
            </div>
            <h4 className="font-sans text-xs font-bold text-[#1a260e]/50 uppercase tracking-[0.15em]">
              Certifications
            </h4>
          </div>
          <ul className="space-y-2.5">
            {teacher.certifications.slice(0, 3).map((cert, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-[#1a260e] rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm text-[#1a260e]/70 font-light leading-relaxed">{cert}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Classes Teaching */}
      {teacher.classesTeaching && teacher.classesTeaching.length > 0 && (
        <div className="mb-7 relative z-10">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-full bg-[#1a260e]/5 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-[#1a260e]" />
            </div>
            <h4 className="font-sans text-xs font-bold text-[#1a260e]/50 uppercase tracking-[0.15em]">
              Teaching
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {teacher.classesTeaching.slice(0, 3).map((classType, index) => (
              <span
                key={index}
                className="inline-block bg-[#1a260e] text-white px-3 py-1.5 rounded-full text-xs font-semibold"
              >
                {classType}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Featured Quote */}
      {teacher.featuredQuote && (
        <div className="mb-7 p-5 bg-gradient-to-br from-[#1a260e]/[0.03] to-transparent rounded-2xl border-l-4 border-[#1a260e] relative z-10">
          <Quote className="w-5 h-5 text-[#1a260e]/40 mb-3" />
          <p className="text-sm text-[#1a260e]/70 italic leading-relaxed font-light">
            "{teacher.featuredQuote}"
          </p>
        </div>
      )}

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#1a260e]/10 to-transparent my-7" />

      {/* Stats & Social */}
      <div className="flex items-center justify-between relative z-10">
        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-[#1a260e]/60">
          {teacher.totalClasses && (
            <div>
              <span className="font-bold text-[#1a260e] text-base">{teacher.totalClasses}</span>
              <span className="ml-1 font-light">classes</span>
            </div>
          )}
          {teacher.experience && (
            <div>
              <span className="font-bold text-[#1a260e] text-base">{teacher.experience}</span>
              <span className="ml-1 font-light">exp</span>
            </div>
          )}
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-2.5">
          {teacher.instagramHandle && (
            <a
              href={`https://instagram.com/${teacher.instagramHandle.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center
                hover:scale-110 hover:shadow-[0_8px_20px_rgba(168,85,247,0.4)]
                transition-all duration-300"
              aria-label={`Follow ${teacher.name} on Instagram`}
            >
              <Instagram className="w-5 h-5 text-white" />
            </a>
          )}
          {teacher.websiteUrl && (
            <a
              href={teacher.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-[#1a260e] rounded-full flex items-center justify-center
                hover:scale-110 hover:shadow-[0_8px_20px_rgba(26,38,14,0.4)]
                transition-all duration-300"
              aria-label={`Visit ${teacher.name}'s website`}
            >
              <ExternalLink className="w-4 h-4 text-white" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Compact teacher card for lists or sidebars
 */
export function CompactTeacherCard({ teacher }: { teacher: MomenceTeacher }) {
  const profileImage = teacher.profileImageUrl || null;

  return (
    <div className="group flex items-start gap-4 p-6 bg-white border border-[#1a260e]/10 rounded-xl hover:border-[#1a260e]/20 hover:shadow-lg transition-all duration-200">
      {/* Profile Image */}
      <div className="flex-shrink-0">
        {profileImage ? (
          <img
            src={profileImage}
            alt={teacher.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-[#fffcf2] shadow group-hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-100 to-green-200 border-2 border-[#fffcf2] shadow flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
            <User className="w-8 h-8 text-green-700" />
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h4 className="font-serif text-lg font-light text-[#1a260e] mb-1">{teacher.name}</h4>
        {teacher.shortBio && (
          <p className="text-sm text-green-700 font-medium mb-2">{teacher.shortBio}</p>
        )}
        {teacher.specialties && teacher.specialties.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {teacher.specialties.slice(0, 2).map((specialty, index) => (
              <span
                key={index}
                className="inline-block bg-green-50 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium"
              >
                {specialty}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Instagram Link */}
      {teacher.instagramHandle && (
        <a
          href={`https://instagram.com/${teacher.instagramHandle.replace('@', '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200"
          aria-label={`Follow ${teacher.name} on Instagram`}
        >
          <Instagram className="w-4 h-4 text-white" />
        </a>
      )}
    </div>
  );
}

/**
 * Featured teacher showcase card
 */
export function FeaturedTeacherCard({ teacher }: { teacher: MomenceTeacher }) {
  const profileImage = teacher.profileImageUrl || null;

  return (
    <div className="relative bg-gradient-to-br from-[#1a260e] to-[#2a3616] text-[#fffcf2] rounded-2xl p-10 overflow-hidden shadow-2xl">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10">
        {/* Profile Image */}
        <div className="text-center mb-6">
          {profileImage ? (
            <img
              src={profileImage}
              alt={teacher.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-[#fffcf2]/20 shadow-xl mx-auto"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-green-600 border-4 border-[#fffcf2]/20 shadow-xl flex items-center justify-center mx-auto">
              <User className="w-16 h-16 text-white" />
            </div>
          )}
        </div>

        {/* Name & Title */}
        <div className="text-center mb-6">
          <h3 className="font-serif text-3xl font-light mb-2">{teacher.name}</h3>
          {teacher.shortBio && (
            <p className="text-lg text-green-400 font-medium">{teacher.shortBio}</p>
          )}
          {teacher.rating && (
            <div className="flex items-center justify-center gap-2 mt-3">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="text-[#fffcf2]/90">{teacher.rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* Bio */}
        <p className="text-center text-[#fffcf2]/80 leading-relaxed mb-6 max-w-2xl mx-auto">
          {teacher.bio}
        </p>

        {/* Specialties */}
        {teacher.specialties && teacher.specialties.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {teacher.specialties.map((specialty, index) => (
              <span
                key={index}
                className="inline-block bg-white/10 backdrop-blur-sm text-[#fffcf2] px-4 py-2 rounded-full text-sm font-medium border border-white/20"
              >
                {specialty}
              </span>
            ))}
          </div>
        )}

        {/* Social Link */}
        {teacher.instagramHandle && (
          <div className="text-center">
            <a
              href={`https://instagram.com/${teacher.instagramHandle.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 font-medium"
            >
              <Instagram className="w-5 h-5" />
              Follow on Instagram
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
