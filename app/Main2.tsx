'use client'

import React, { useState } from 'react'
import {
  FiMenu,
  FiUsers,
  FiSmartphone,
  FiLock,
  FiTrendingUp,
  FiList,
  FiClock,
  FiBarChart2,
  FiSearch,
  FiTag,
} from 'react-icons/fi'
import landingDemoImage from '../public/static/images/landing-demo.jpeg'
import dashboardDemoImage from '../public/static/images/dashboard-demo.jpg'
import Image from 'next/image'
import landingContent from '@/data/landingContent.json'
import Link from 'next/link'
import { HiCheckCircle } from 'react-icons/hi2'

const iconMap = {
  FiUsers: FiUsers,
  FiSmartphone: FiSmartphone,
  FiLock: FiLock,
  FiTrendingUp: FiTrendingUp,
  FiList: FiList,
  FiClock: FiClock,
  FiBarChart2: FiBarChart2,
  FiSearch,
  FiTag,
}

const imageMap = {
  landingDemoImage: landingDemoImage,
  dashboardDemoImage: dashboardDemoImage,
}

const FeaturesSection = () => {
  const [selectedFeature, setSelectedFeature] = useState(landingContent.mainFeatures[0])

  return (
    <section
      id="features"
      aria-label="Features for investing all your money"
      className="bg-gray-900 py-20 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 items-center gap-8 lg:gap-16 xl:gap-24">
          {/* Features List */}
          <div
            className="relative z-10 col-span-4 space-y-6"
            role="tablist"
            aria-orientation="vertical"
          >
            {landingContent.mainFeatures.map((feature) => {
              const Icon = iconMap[feature.icon]
              return (
                <button
                  key={feature.id}
                  onClick={() => setSelectedFeature(feature)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSelectedFeature(feature)
                    }
                  }}
                  className={`relative w-full rounded-2xl text-left transition-colors ${
                    selectedFeature.id === feature.id ? 'bg-gray-800' : 'hover:bg-gray-800/30'
                  }`}
                >
                  <div className="relative z-10 p-8">
                    <Icon className="h-8 w-8 text-white" />
                    <h3 className="mt-6 text-lg font-semibold text-white">{feature.title}</h3>
                    <p className="mt-2 text-sm text-gray-400">{feature.description}</p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Image Display */}
          <div className="relative col-span-8 aspect-[16/9]">
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              <Image
                src={imageMap[selectedFeature.image]}
                alt={selectedFeature.title}
                fill
                className="object-cover transition-all duration-700 ease-in-out"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 75vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-gray-900/0" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const Main2 = () => {
  const { hero, mainFeatures, featureTitle, featureDescription, features, cta, pricing } =
    landingContent

  return (
    <>
      <header>
        <nav>
          <div className="relative z-50 mx-auto flex max-w-7xl justify-between px-4 py-8 sm:px-6 lg:px-8">
            <div className="relative z-10 flex items-center gap-16">
              <div className="hidden lg:flex lg:gap-10">
                <Link
                  href="/#features"
                  className="relative -mx-3 -my-2 rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors delay-150 hover:text-slate-900 hover:delay-0 dark:text-slate-300"
                >
                  <span className="relative z-10">Features</span>
                </Link>
                <Link
                  href="/#pricing"
                  className="relative -mx-3 -my-2 rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors delay-150 hover:text-slate-900 hover:delay-0 dark:text-slate-300"
                >
                  <span className="relative z-10">Pricing</span>
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="lg:hidden" data-headlessui-state="">
                <button
                  className="relative z-10 -m-2 inline-flex items-center rounded-lg stroke-gray-900 p-2 hover:bg-gray-200/50 hover:stroke-gray-600 focus:not-data-focus:outline-hidden active:stroke-gray-900"
                  aria-label="Toggle site navigation"
                  type="button"
                  aria-expanded="false"
                  data-headlessui-state=""
                  id="headlessui-popover-button-:R1epfja:"
                >
                  <FiMenu className="h-6 w-6" />
                </button>
              </div>
              <div
                hidden
                style={{
                  position: 'fixed',
                  top: '1px',
                  left: '1px',
                  width: '1px',
                  height: 0,
                  padding: 0,
                  margin: '-1px',
                  overflow: 'hidden',
                  clip: 'rect(0, 0, 0, 0)',
                  whiteSpace: 'nowrap',
                  borderWidth: 0,
                  display: 'none',
                }}
              ></div>
            </div>
          </div>
        </nav>
      </header>
      <main className="flex-auto">
        <div className="overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
              <div className="relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
                <h1
                  className="text-4xl font-medium tracking-tight text-slate-900 dark:text-slate-200"
                  dangerouslySetInnerHTML={{ __html: hero.title }}
                />
                <p className="mt-6 text-lg text-slate-600 dark:text-slate-300">
                  {hero.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
                  <Link
                    href={hero.primaryCta.link}
                    className="bg-primary-500 hover:bg-primary-600 inline-flex items-center justify-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-white md:px-8 md:py-4 md:text-lg"
                  >
                    {hero.primaryCta.text}
                  </Link>
                  <Link
                    href={hero.secondaryCta.link}
                    className="bg-primary-100 hover:bg-primary-200 dark:text-primary-50 inline-flex items-center justify-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-white md:px-8 md:py-4 md:text-lg dark:bg-slate-800 dark:hover:bg-gray-100"
                  >
                    {hero.secondaryCta.text}
                  </Link>
                </div>
              </div>
              <div className="relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6">
                <div className="absolute top-4 left-1/2 h-[1026px] w-[1026px] -translate-x-1/3 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] stroke-gray-300/70 sm:top-16 sm:-translate-x-1/2 lg:-top-16 lg:ml-12 xl:-top-14 xl:ml-0">
                  <svg
                    viewBox="0 0 1026 1026"
                    fill="none"
                    aria-hidden="true"
                    className="animate-spin-slow absolute inset-0 h-full w-full"
                  >
                    <path
                      d="M1025 513c0 282.77-229.23 512-512 512S1 795.77 1 513 230.23 1 513 1s512 229.23 512 512Z"
                      stroke="#D4D4D4"
                      strokeOpacity="0.7"
                    ></path>
                    <path
                      d="M513 1025C230.23 1025 1 795.77 1 513"
                      stroke="url(#:S1:-gradient-1)"
                      strokeLinecap="round"
                    ></path>
                    <defs>
                      <linearGradient
                        id=":S1:-gradient-1"
                        x1="1"
                        y1="513"
                        x2="1"
                        y2="1025"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#06b6d4"></stop>
                        <stop offset="1" stopColor="#06b6d4" stopOpacity="0"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                  <svg
                    viewBox="0 0 1026 1026"
                    fill="none"
                    aria-hidden="true"
                    className="animate-spin-reverse-slower absolute inset-0 h-full w-full"
                  >
                    <path
                      d="M913 513c0 220.914-179.086 400-400 400S113 733.914 113 513s179.086-400 400-400 400 179.086 400 400Z"
                      stroke="#D4D4D4"
                      strokeOpacity="0.7"
                    ></path>
                    <path
                      d="M913 513c0 220.914-179.086 400-400 400"
                      stroke="url(#:S1:-gradient-2)"
                      strokeLinecap="round"
                    ></path>
                    <defs>
                      <linearGradient
                        id=":S1:-gradient-2"
                        x1="913"
                        y1="513"
                        x2="913"
                        y2="913"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#06b6d4"></stop>
                        <stop offset="1" stopColor="#06b6d4" stopOpacity="0"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="-mx-4 h-[448px] [mask-image:linear-gradient(to_bottom,white_60%,transparent)] px-9 sm:mx-0 lg:absolute lg:-inset-x-10 lg:-top-10 lg:-bottom-20 lg:h-auto lg:px-0 lg:pt-10 xl:-bottom-32">
                  <div className="relative mx-auto aspect-366/729 max-w-7xl">
                    <div className="relative">
                      <div className="w-full overflow-hidden rounded-lg shadow-xl">
                        <Image
                          src={landingDemoImage}
                          alt="AI Landing Page Generator Demo"
                          width={1024}
                          height={576}
                          className="h-auto w-full"
                        />
                      </div>
                      <div className="bg-primary-500/10 absolute -right-4 -bottom-4 h-24 w-24 rounded-full blur-2xl" />
                      <div className="bg-primary-500/10 absolute -top-4 -left-4 h-24 w-24 rounded-full blur-2xl" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative -mt-4 lg:col-span-7 lg:mt-0 xl:col-span-6"></div>
            </div>
          </div>
        </div>
        <FeaturesSection />
        {/* Secondary Features Section */}
        <section
          id="secondary-features"
          aria-label="Features for building a portfolio"
          className="py-20 sm:py-32"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="text-3xl font-medium tracking-tight text-slate-900 dark:text-slate-200">
                {featureTitle}
              </h2>
              <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">
                {featureDescription}
              </p>
            </div>
            <ul className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 text-sm sm:mt-20 sm:grid-cols-2 md:gap-y-10 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => {
                const Icon = iconMap[feature.icon]
                return (
                  <li key={feature.title} className="rounded-2xl border border-gray-200 p-8">
                    {Icon && <Icon className="text-primary-500 h-8 w-8" />}
                    <h3 className="mt-6 text-lg font-semibold text-slate-900 md:text-2xl dark:text-slate-200">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-slate-700 dark:text-slate-300">{feature.description}</p>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>

        {/* Get Free Shares Section */}
        <section
          id="get-free-shares-today"
          className="relative overflow-hidden bg-gray-900 py-20 sm:py-28"
        >
          <div className="absolute top-1/2 left-20 -translate-y-1/2 sm:left-1/2 sm:-translate-x-1/2">
            <svg
              viewBox="0 0 558 558"
              width="558"
              height="558"
              fill="none"
              aria-hidden="true"
              className="animate-spin-slower"
            >
              <defs>
                <linearGradient
                  id=":S3:"
                  x1="79"
                  y1="16"
                  x2="105"
                  y2="237"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#fff"></stop>
                  <stop offset="1" stopColor="#fff" stopOpacity="0"></stop>
                </linearGradient>
              </defs>
              <path
                opacity=".2"
                d="M1 279C1 125.465 125.465 1 279 1s278 124.465 278 278-124.465 278-278 278S1 432.535 1 279Z"
                stroke="#fff"
              ></path>
              <path
                d="M1 279C1 125.465 125.465 1 279 1"
                stroke="url(#:S3:)"
                strokeLinecap="round"
              ></path>
            </svg>
          </div>
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-md sm:text-center">
              <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
                {cta.title}
              </h2>
              <p className="mt-4 text-lg text-gray-300">{cta.description}</p>
              <div className="mt-8 flex justify-center">
                <Link
                  href={cta.button.link}
                  className="bg-primary-500 hover:bg-primary-600 inline-flex items-center justify-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-white md:px-8 md:py-4 md:text-lg"
                >
                  {cta.button.text}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" aria-label="Pricing plans" className="py-20 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold">{pricing.title}</h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">{pricing.description}</p>
            </div>
            <div className="mt-12 grid gap-8 lg:grid-cols-3">
              {pricing.plans.map((plan, index) => (
                <div key={plan.name}>
                  {!plan.highlighted ? (
                    // First style for first two plans
                    <section className="flex flex-col overflow-hidden rounded-3xl bg-slate-50 p-6 shadow-lg shadow-gray-900/5 dark:bg-slate-800">
                      <h3 className="flex items-center text-lg font-semibold text-slate-900 md:text-2xl dark:text-slate-200">
                        <span className="ml-4">{plan.name}</span>
                      </h3>
                      <p className="relative mt-5 flex text-3xl tracking-tight text-slate-900 dark:text-slate-200">
                        {plan.price}
                      </p>
                      <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
                        {plan.description}
                      </p>
                      <div className="order-last mt-6">
                        <ul className="-my-2 divide-y divide-gray-200 text-sm text-slate-700 dark:text-slate-300">
                          {plan.features.map((feature) => (
                            <li key={feature} className="flex py-2">
                              <HiCheckCircle className="text-primary-500 h-6 w-6 flex-none" />
                              <span className="ml-4">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Link
                        href={plan.cta.link}
                        className="mt-6 inline-flex justify-center rounded-lg bg-slate-800 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-900 active:bg-slate-800 active:text-white/80 dark:bg-slate-600"
                      >
                        {plan.cta.text}
                      </Link>
                    </section>
                  ) : (
                    // Second style for remaining plans
                    <section className="order-first flex flex-col overflow-hidden rounded-3xl bg-slate-900 p-6 shadow-lg shadow-gray-900/5 lg:order-none dark:bg-slate-300">
                      <h3 className="flex items-center text-lg font-semibold text-white md:text-2xl dark:text-slate-800">
                        <span className="ml-4">{plan.name}</span>
                      </h3>
                      <p className="relative mt-5 flex text-3xl tracking-tight text-white dark:text-slate-800">
                        <span aria-hidden="false" className="transition duration-300">
                          {plan.price}
                        </span>
                      </p>
                      <p className="mt-3 text-sm text-gray-300 dark:text-slate-800">
                        {plan.description}
                      </p>
                      <div className="order-last mt-6">
                        <ul className="-my-2 divide-y divide-gray-800 text-sm text-gray-300 dark:text-slate-600">
                          {plan.features.map((feature) => (
                            <li key={feature} className="flex py-2">
                              <HiCheckCircle className="h-6 w-6 flex-none text-white dark:text-slate-800" />
                              <span className="ml-4">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <a
                        className="bg-primary-500 relative mt-6 inline-flex justify-center overflow-hidden rounded-lg px-3 py-2 text-sm font-semibold text-white transition-colors before:absolute before:inset-0 before:transition-colors hover:before:bg-white/10 active:bg-cyan-600 active:text-white/80 active:before:bg-transparent"
                        href={plan.cta.link}
                      >
                        {plan.cta.text}
                      </a>
                    </section>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section
          id="faqs"
          aria-labelledby="faqs-title"
          className="border-t border-slate-200 py-20 sm:py-32 dark:border-slate-800"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2
                id="faqs-title"
                className="text-3xl font-medium tracking-tight text-slate-900 dark:text-slate-200"
              >
                {landingContent.faqs.title}
              </h2>
              <p
                className="mt-2 text-lg text-slate-600 dark:text-slate-300"
                dangerouslySetInnerHTML={{ __html: landingContent.faqs.description }}
              />
            </div>
            <ul className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3">
              {landingContent.faqs.questions.map((faq, index) => (
                <li key={index}>
                  <h3 className="text-lg/6 font-semibold text-slate-900 dark:text-slate-200">
                    {faq.question}
                  </h3>
                  <p className="mt-4 text-sm text-slate-700 dark:text-slate-300">{faq.answer}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  )
}

export default Main2
