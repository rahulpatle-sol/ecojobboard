import React from 'react'
import NavBar from './components/NavBar'
import Hero from './components/HeroPage'
import Roadmap from './components/Roadmap'
import IntelligentHiring from './components/IntelligentHiring'
import JobSearchSection from './components/JobsearchSection'
import BenefitsSection from './components/BenefitSection'
import TestimonialSection from './components/Testimonials'
import PricingSection from './components/Pricing'
import FinalCTASection from './components/FinalCtaSection'
import ContactSection from './components/ContacSection'
import FooterSection from './components/Footer'

const App = () => {
  return (
    <div>
      <NavBar></NavBar>
      <Hero></Hero>
      <Roadmap/>
      <IntelligentHiring/>
      <JobSearchSection/>
      <BenefitsSection/>
      <TestimonialSection></TestimonialSection>
     <PricingSection/>
     <FinalCTASection/>
     <ContactSection/>
     <FooterSection/>


    </div>
  )
}

export default App
