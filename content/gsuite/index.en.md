---
# Without an _index file in this section (gsuite), hugo does not use a section
# template to render this file and we dont want that anyway (to alows page
# resourcers in sub-folders). To spcify the layout, use Both [type, layout]
# see: https://gohugo.io/content-management/sections/#nested-sections
# Instead of listing aliases here, put them in /config/s3.www.iceweb.co.json
aliases: []
type: gsuite
layout: index
title: G Suite

# Customer logos displayed in the G Suite homepage
# The classList contains css classes used to size each logo separately
customers:
- name: NESK Group
  logo: 'images/customer-logos/nesk*'
  classList: 'customerList__item--nesk'

- name:: Saudi Jawahir
  logo: 'images/customer-logos/jawahir*'
  classList: 'customerList__item--jawahir'

- name:: Jaddarah
  logo: 'images/customer-logos/jaddarah*'
  classList: 'customerList__item--jaddarah'

- name:: Wadi AlNahil
  logo: 'images/customer-logos/wadialnahil*'
  classList: 'customerList__item--wadialnahil'

- name:: SafwaFood
  logo: 'images/customer-logos/safwafood*'
  classList: 'customerList__item--safwafood'

- name:: Steelcase Jeraisy Factory
  logo: 'images/customer-logos/steelcase*'
  classList: 'customerList__item--steelcase'

# Pricing table in the G Suite homepage. 'data' list refers to hugo data files
# located in 'data/<dataDir>'
pricing:
  iconsDir: images/feature-icons
  dataDir: gsuite
  data:
  - basic
  - business
  - enterprise
---
