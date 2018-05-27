---
# Without an _index file in this section (gsuite), hugo does not use a section
# template to render this file and we dont want that anyway. That's why both
# [type, layout] are needed to correctly specify the layout
aliases: [/ar, /en, /gsuite]
type: gsuite
layout: index
title: G Suite

# Customer logos displayed in G Suite homepage
# The id is used as a filename for the logo file in ./customer-logos
# The classList contains css classes used to size each logo separately
customers:
- id: nesk
  name: NESK Group
  classList: 'customerList__item--nesk'

- id: jawahir
  name: Saudi Jawahir
  classList: 'customerList__item--jawahir'

- id: jaddarah
  name: Jaddarah
  classList: 'customerList__item--jaddarah'

- id: wadialnahil
  name: Wadi AlNahil
  classList: 'customerList__item--wadialnahil'

- id: safwafood
  name: SafwaFood
  classList: 'customerList__item--safwafood'

- id: steelcase
  name: Steelcase Jeraisy Factory
  classList: 'customerList__item--steelcase'
---
