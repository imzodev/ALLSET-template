'use client'

import React from 'react'
import Link from 'next/link'
import { Space_Grotesk, Inter } from 'next/font/google'
import { PricingSection as PricingSectionType } from 'app/allset/landing-content/types'

const display = Space_Grotesk({ subsets: ['latin'], weight: ['500', '700'] })
const body = Inter({ subsets: ['latin'] })

interface Props {
  pricing: PricingSectionType
}

const PricingCard: React.FC<{
  name: string
  price: string
  description?: string
  features: { text: string }[]
  cta?: { text: string; link: string }
  highlighted?: boolean
}> = ({ name, price, description, features, cta, highlighted }) => {
  return (
    <div
      className={`group relative h-full rounded-2xl border ${
        highlighted ? 'border-transparent' : 'border-gray-200 dark:border-gray-800'
      } bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-900`}
    >
      {/* gradient ring on hover and when highlighted */}
      <div
        className={`pointer-events-none absolute -inset-[1px] -z-10 rounded-2xl opacity-0 transition-opacity ${
          highlighted ? 'opacity-100' : 'group-hover:opacity-100'
        }`}
        style={{
          background: 'linear-gradient(135deg, rgba(99,102,241,0.55), rgba(168,85,247,0.55))',
        }}
      />

      <div className="relative flex h-full flex-col rounded-2xl p-6">
        <div className="flex items-baseline justify-between">
          <h3
            className={`${display.className} text-lg font-semibold text-gray-900 dark:text-white`}
          >
            {name}
          </h3>
          <div
            className={`${display.className} text-2xl font-extrabold text-gray-900 dark:text-white`}
          >
            {price}
          </div>
        </div>
        {description ? (
          <p className={`${body.className} mt-2 text-sm text-gray-600 dark:text-gray-300`}>
            {description}
          </p>
        ) : null}

        <ul className="mt-6 space-y-2 text-sm text-gray-700 dark:text-gray-300">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-2">
              <svg
                className="mt-0.5 h-4 w-4 flex-none text-emerald-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3.5-3.5a1 1 0 111.414-1.414l2.793 2.793 6.543-6.543a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{f.text}</span>
            </li>
          ))}
        </ul>

        {cta ? (
          <div className="mt-auto pt-6">
            <Link
              href={cta.link}
              className="group from-primary-600 inline-flex w-full items-center justify-center rounded-md bg-gradient-to-r to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(147,51,234,0.6)] transition-all hover:shadow-[0_12px_36px_-12px_rgba(147,51,234,0.8)]"
            >
              {cta.text}
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  )
}

const PricingSection: React.FC<Props> = ({ pricing }) => {
  const { title, description, plans } = pricing

  if (!plans || plans.length === 0) return null

  return (
    <section id="pricing" className="relative py-20 sm:py-24">
      {/* subtle gradient backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white to-white dark:from-gray-950 dark:to-gray-950" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          {title ? (
            <h2
              className={`${display.className} text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white`}
            >
              {title}
            </h2>
          ) : null}
          {description ? (
            <p className={`${body.className} mt-4 text-gray-600 dark:text-gray-300`}>
              {description}
            </p>
          ) : null}
          {/* small caption for currency */}
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">Moneda: MXN</div>
        </div>

        <div className="mt-12 grid grid-cols-1 items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((p, idx) => (
            <PricingCard
              key={idx}
              name={p.name}
              price={p.price}
              description={p.description}
              features={p.features || []}
              cta={p.cta}
              highlighted={p.highlighted}
            />
          ))}
        </div>

        {/* trust note */}
        <div className="mt-10 flex items-center justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/60 px-4 py-2 text-xs text-gray-700 backdrop-blur dark:border-gray-800 dark:bg-gray-900/60 dark:text-gray-200">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Atención personalizada • Precios claros • Contacto directo
          </div>
        </div>
      </div>
    </section>
  )
}

export default PricingSection
