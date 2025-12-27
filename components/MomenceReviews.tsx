'use client';

import { useEffect } from 'react';

export default function MomenceReviews() {
    useEffect(() => {
        // Check if script already exists
        const existingScript = document.querySelector('script[src="https://momence.com/plugin/reviews/reviews.js"]');
        if (existingScript) return;

        const script = document.createElement('script');
        script.src = 'https://momence.com/plugin/reviews/reviews.js';
        script.async = true;
        script.type = 'module';
        script.setAttribute('host_id', '75303');
        script.setAttribute('is_profile_picture_enabled', 'true');
        script.setAttribute('is_text_only_enabled', 'true');
        script.setAttribute('is_session_and_teacher_info_enabled', 'true');
        script.setAttribute('layout', 'horizontal');
        script.setAttribute('signature', 'b5276d8f04f580428352131d60c1206a43a3e929ee68a214824cd8882bf0ac17');

        document.getElementById('momence-plugin-reviews')?.appendChild(script);

        return () => {
            script.remove();
        };
    }, []);

    return (
        <>
            <style jsx global>{`
                :root {
                    --momenceReviewColorBackground: transparent;
                    --momenceBorder: none;
                    --momenceBorderRadius: 0;
                    --momenceBoxShadow: none;
                }

                /* Reset all backgrounds */
                #momence-plugin-reviews,
                #momence-plugin-reviews > div,
                #momence-plugin-reviews * {
                    background: transparent !important;
                    background-color: transparent !important;
                }

                /* Main container - remove any borders/shadows */
                #momence-plugin-reviews > div {
                    border: none !important;
                    box-shadow: none !important;
                    padding: 0 !important;
                }

                /* Style the review cards elegantly */
                #momence-plugin-reviews [class*="review"],
                #momence-plugin-reviews [class*="card"],
                #momence-plugin-reviews [class*="Review"],
                #momence-plugin-reviews [class*="Card"] {
                    background: transparent !important;
                    border: none !important;
                    border-bottom: 1px solid rgba(26, 38, 14, 0.08) !important;
                    box-shadow: none !important;
                    border-radius: 0 !important;
                    padding: 2rem 0 !important;
                }

                /* Review text styling */
                #momence-plugin-reviews p,
                #momence-plugin-reviews span {
                    font-family: 'Inter', sans-serif !important;
                    color: rgba(26, 38, 14, 0.8) !important;
                }

                /* Reviewer name */
                #momence-plugin-reviews h3,
                #momence-plugin-reviews h4,
                #momence-plugin-reviews [class*="name"],
                #momence-plugin-reviews [class*="Name"] {
                    font-family: 'Playfair Display', serif !important;
                    color: #1a260e !important;
                    font-weight: 400 !important;
                    letter-spacing: 0.02em !important;
                }

                /* Date and session info - subtle */
                #momence-plugin-reviews [class*="date"],
                #momence-plugin-reviews [class*="Date"],
                #momence-plugin-reviews [class*="session"],
                #momence-plugin-reviews [class*="Session"],
                #momence-plugin-reviews time {
                    font-size: 0.75rem !important;
                    text-transform: uppercase !important;
                    letter-spacing: 0.1em !important;
                    color: rgba(26, 38, 14, 0.5) !important;
                }

                /* Star ratings */
                #momence-plugin-reviews [class*="star"],
                #momence-plugin-reviews [class*="Star"],
                #momence-plugin-reviews svg[class*="star"] {
                    color: #1a260e !important;
                    fill: #1a260e !important;
                }

                /* Navigation arrows - elegant circles */
                #momence-plugin-reviews button {
                    background: transparent !important;
                    border: 1px solid rgba(26, 38, 14, 0.2) !important;
                    border-radius: 50% !important;
                    width: 48px !important;
                    height: 48px !important;
                    transition: all 0.3s ease !important;
                }

                #momence-plugin-reviews button:hover {
                    background: #1a260e !important;
                    border-color: #1a260e !important;
                }

                #momence-plugin-reviews button:hover svg,
                #momence-plugin-reviews button:hover path {
                    stroke: #fffcf2 !important;
                    color: #fffcf2 !important;
                }

                #momence-plugin-reviews button svg,
                #momence-plugin-reviews button path {
                    stroke: #1a260e !important;
                    color: #1a260e !important;
                    transition: all 0.3s ease !important;
                }

                /* Hide or style the powered by badge */
                #momence-plugin-reviews [class*="powered"],
                #momence-plugin-reviews [class*="Powered"],
                #momence-plugin-reviews a[href*="momence"] {
                    opacity: 0.3 !important;
                    font-size: 0.65rem !important;
                    letter-spacing: 0.15em !important;
                    text-transform: uppercase !important;
                    margin-top: 2rem !important;
                }

                #momence-plugin-reviews a[href*="momence"]:hover {
                    opacity: 0.5 !important;
                }

                /* Remove any outer wrapper styling */
                #momence-plugin-reviews > div > div:first-child {
                    border: none !important;
                    box-shadow: none !important;
                }
            `}</style>
            <div id="momence-plugin-reviews"></div>
        </>
    );
}
