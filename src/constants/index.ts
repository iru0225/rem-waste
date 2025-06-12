export const SKIP_SESSION_STORAGE = 'SKIP_SESSION_STORAGE'
export const IMAGE_URL = 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/{{size}}-yarder-skip.jpg'
export const FILTERS_CHECKBOX = [
  {
    name: 'heavyWaste',
    label: 'Suitable for heave waste'
  },
  {
    name: 'onRoad',
    label: 'Allowed on the road'
  }
]
export const FILTERS_PILL = [
  {
    name: 'fourToFive',
    label: '1 ~ 5'
  },
  {
    name: 'sixToTen',
    label: '6 ~ 10'
  },
  {
    name: 'elevenToFiveteen',
    label: '11 ~ 15'
  },
  {
    name: 'moreThanFiveteen',
    label: '> 15'
  }
]

export const FILTER_PILL_LABEL: Record<string, string> = {
  heavyWaste: 'Heave Waste',
  onRoad: 'Allowed On The Road',
  fourToFive: '1 ~ 5',
  sixToTen: '6 ~ 10',
  elevenToFiveteen: '11 ~ 15',
  moreThanFiveteen: '> 15'
}