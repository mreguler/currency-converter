# Chrome Extension Idea: Currency Converter

## Authors

Kim Fung, Cherilynn Chow, Sam May, Emre Guler

## Problem Statement

Online shoppers, travelers, and finance enthusiasts often encounter prices listed in foreign currencies when browsing the internet. This can make it challenging to quickly understand the true cost of products, services, or investments in their home currency. Currently, users must either manually convert these currencies using separate apps or websites, which interrupts their browsing experience, or rely on mental approximations, which can be inaccurate.

## Target Audience

The target audience for Currency Converter includes:

- Online shoppers buying from international websites
- Travelers planning trips or purchases in different countries
- Financial analysts and investors monitoring international markets
- Students and professionals who engage with international documents and reports
- Users needing quick and accurate currency conversions while browsing

## Description

Currency Converter is a Chrome Extension that seamlessly integrates real-time currency conversion into the user's browsing experience. With a hover or click, users can instantly convert prices on any webpage to their home currency or a preferred currency. It eliminates the need to disrupt the browsing experience with manual calculations or external websites, offering a streamlined, in-page conversion feature.

## Selling Points

1. Real-time currency conversion directly on web pages, without navigating away
2. Customizable preferences for default home currency and frequently used currencies
3. Automatically detects and highlights prices on web pages for conversion
4. Supports conversion for a comprehensive list of global currencies, updated in real-time
5. Simplifies shopping, travel planning, and financial analysis with instant, in-page currency insights

## User Stories

1. As an online shopper, I want to see the price of an item listed in a foreign currency converted to my home currency without leaving the webpage, so that I can quickly assess its cost.
2. As a traveler, I want to convert prices of hotels, flights, and activities into my preferred currency with a simple hover or click, so I can plan my budget more efficiently.
3. As a financial analyst, I want to easily convert stock prices into various currencies without interrupting my research flow.
4. As an expat, I want to seamlessly convert prices on local websites to my home currency, so I can gauge how expenses align with my budgeting and financial planning.
5. As a freelance professional working with international clients, I want to convert their payments from multiple currencies into my home currency instantly on my invoicing platform, so I can easily manage my finances and understand my earnings without constant manual calculations.
6. As an online marketer analyzing ad spends across different countries, I want to convert advertising costs into a single currency directly on the ad platforms, so I can accurately assess and compare the ROI of global campaigns.
7. As an enthusiast of international e-commerce, I want to convert auction prices on international bidding sites to my local currency in real-time, so I can make quick decisions on bids without being hindered by currency conversion delays or inaccuracies.
8. As a content creator working with a global audience, I want an easy way to display my earnings and expenses in multiple currencies across different platforms in a consolidated dashboard, so I can manage my finances better and make informed decisions about where to focus my content creation efforts.
9. As an international investor, I want a real-time currency conversion feature integrated into my investment tracking app, so I can see the current value of my overseas investments in my home currency without needing to use separate tools or manually calculate conversions.
10. As a user of financial education platforms, I want interactive tools that automatically convert financial examples and exercises into my local currency, so I can better relate to the material and apply the concepts to my personal financial situation.
11. As a global online retailer, I want to offer customers the option to view product prices in their preferred currency based on their location or selection, so they can shop more comfortably and make purchasing decisions with ease, enhancing their overall shopping experience on my platform.
12. As a multi-national company employee managing projects across different countries, I want an integrated tool within our project management software that automatically converts and displays all project-related expenses into a single currency of my choice, so I can track and manage budgets more efficiently without manually converting currencies.
    
## Notes

Needs to be simple and seamless to work. Could also include a feature to adjust font size and type.

## References & Inspiration

From round3 of the ideation GitHub done in class

## Technical Details

### User Interface

- Users will click on the badge and a pop-up will appear. The pop-up will contain an option for users to choose which currency they want to convert the prices on the page into. Under the currency option, there will be a button to click to convert the currencies of the page. We may also try to implement a
context menu to allow users to manually change the prices that they highlight if, for some reason, the extension does not change that specific price.

- Badge, pop-up, (and possibly context menu for manual replacement if this is implementable)

### API, Libraries, and Frameworks

_[- List any APIs, libraries, or frameworks that you plan to use in your Chrome Extension.]_
API: exchangerates API

_[- Include links to the documentation or other relevant resources.]_
API: https://exchangeratesapi.io/

_[- Explain very briefly how you will use these tools in your project, one sentence per item.]_
API: We will use this to provide real-time exchange rates for conversions.

### Data Storage

- Settings (user preferences): This will be local. This will be stored in a JSON with key-value pairs.
- Home currency and converting currency

### Collaboration and Task Allocation

- **Leader:** Cherilynn Chow
- **Manager:** Kim Fung
- **Remaining Team Members:** Sam May, Emre Guler

Cherilynn Chow: UI/UX design, HTML/CSS, testing
Kim Fung: UI/UX design, HTML/CSS, testing
Sam May: JavaScript logic, API storage, testing
Emre Guler: JavaScript logic, API storage, testing

We will have weekly meetings. We'll use Zoom, Slack, and GitHub.

### Risks and Mitigation
- Some prices won't convert. So, we may implement something to manually convert prices.
- We might run out of API calls so, as a solution, we can switch between each of us to use each other's API keys.

### Milestones and Timeline

_[- Week 1: Design and finalize wireframing
- Week 2: Work on the HTML/CSS (Cherilynn and Kim) and JavaScript (Sam and Emre)
- Week 3: Finish up the HTML/CSS (Cherilynn and Kim) and JavaScript (Sam and Emre)
- Week 4: Testing and create demo / prepare presentation
