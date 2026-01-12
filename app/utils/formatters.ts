export const formatDate = (date: string | Date | undefined): string => {
  if (!date) return ''
  // Formate la date en français
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}
