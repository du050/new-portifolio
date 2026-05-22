import type { PortfolioContent } from '@portfolio/shared';
import { useEffect } from 'react';

const DEFAULT_DESCRIPTION =
  'Junior software engineer portfolio — full-stack delivery, thoughtful system design, and growing DevOps practice.';

export function usePortfolioDocumentMeta(content: PortfolioContent | null): void {
  useEffect(() => {
    const profile = content?.profile;
    if (!profile) {
      return;
    }

    document.title = `${profile.name} | ${profile.title}`;

    const description = profile.headline.trim() || profile.bio.trim() || DEFAULT_DESCRIPTION;
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', description);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', `${profile.name} | ${profile.title}`);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', description);
    }
  }, [content]);
}
