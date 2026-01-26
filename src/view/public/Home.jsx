import React from 'react'
import NavBar from "./NavBar"
import Hero  from "./HeroPage"

import Recruitment from "./Recruitment"
import Roadmap from './Roadmap'
import IntelligentHiring from './IntelligentHiring'
import JobSearchSection from './JobsearchSection';
import BenefitSection from './BenefitSection'
import Testimonial from './Testimonials';
import PartnersCircle from './PartnerCircle';
import PricingSection  from './Pricing';
import FinalCTASection from './FinalCtaSection';
import ContactSection  from  './ContactSection'
import  FooterSection from './Footer';

const Home = () => {
  return (
    <div className='bg-white'>

<NavBar/>
<Hero/>
<Recruitment/> 
<Roadmap/>
<IntelligentHiring/>
<JobSearchSection/>
<BenefitSection/>

<Testimonial/>

<PartnersCircle/>

<PricingSection/>
<FinalCTASection/>
<ContactSection/>
<FooterSection/>

    </div>
  )
}

export default Home;
