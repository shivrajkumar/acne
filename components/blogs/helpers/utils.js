// Generate a clean ID from title + index
export const generateSectionId = (title, index) => {
  if (!title) return `section-${index}`;

  const id = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .trim();

  return id;
};

// Normalize an ID or string (for fuzzy matching)
export const normalizeId = (id) => {
  return id
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .trim();
};

// Attempt to find the best matching DOM ID
export const findBestMatch = (targetId, sections) => {
  // 1. Try exact match
  if (document.getElementById(targetId)) {
    return targetId;
  }

  // 2. Try generated ID match
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    const generatedId = generateSectionId(section.title || section.heading, i);

    if (generatedId === targetId && document.getElementById(generatedId)) {
      return generatedId;
    }

    // 3. Try heading suffix (e.g., #id-heading)
    const headingId = `${generatedId}-heading`;
    if (document.getElementById(headingId)) {
      return headingId;
    }
  }

  // Try normalized fuzzy match
  const normalizedTarget = normalizeId(targetId);
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    const title = section.title || section.heading || '';
    const normalizedTitle = normalizeId(title);

    if (normalizedTitle === normalizedTarget) {
      const generatedId = generateSectionId(title, i);
      if (document.getElementById(generatedId)) {
        return generatedId;
      }
    }
  }

  return null;
};

// Smooth scroll to element with optional offset
export const smoothScrollTo = (elementId, offset = 150) => {
  const element = document.getElementById(elementId);
  if (element) {
    const yOffset = element.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: yOffset, behavior: 'smooth' });
  }
};