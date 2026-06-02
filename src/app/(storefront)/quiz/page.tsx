"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, RotateCcw, Sparkles } from "lucide-react";

import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { skinConcerns } from "@/data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ProductCard } from "@/components/product/product-card";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";

const SKIN_TYPES = ["Oily", "Dry", "Combination", "Sensitive", "Normal"];

type Answers = {
  skinType?: string;
  concerns: string[];
  category?: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ concerns: [] });

  const steps = [
    {
      key: "skinType",
      question: "What's your skin type?",
      help: "This helps us tailor formulas to you.",
      options: SKIN_TYPES,
      multi: false,
    },
    {
      key: "concerns",
      question: "What are your main concerns?",
      help: "Pick all that apply.",
      options: [...skinConcerns],
      multi: true,
    },
    {
      key: "category",
      question: "What are you shopping for today?",
      help: "We'll prioritise this category.",
      options: categories.map((c) => c.name),
      multi: false,
    },
  ] as const;

  const total = steps.length;
  const isResults = step >= total;
  const current = !isResults ? steps[step] : null;

  function pick(value: string) {
    if (!current) return;
    if (current.multi) {
      setAnswers((a) => ({
        ...a,
        concerns: a.concerns.includes(value)
          ? a.concerns.filter((c) => c !== value)
          : [...a.concerns, value],
      }));
    } else {
      setAnswers((a) => ({ ...a, [current.key]: value }));
      setTimeout(() => setStep((s) => s + 1), 250);
    }
  }

  function isSelected(value: string) {
    if (!current) return false;
    if (current.multi) return answers.concerns.includes(value);
    return (answers as Record<string, unknown>)[current.key] === value;
  }

  const recommendations = (() => {
    const catSlug = categories.find((c) => c.name === answers.category)?.slug;
    let list = products.filter((p) =>
      answers.skinType ? p.skinTypes.includes(answers.skinType as never) : true
    );
    const inCat = catSlug ? list.filter((p) => p.category === catSlug) : [];
    const merged = [...inCat, ...list.filter((p) => !inCat.includes(p))];
    return merged.slice(0, 4);
  })();

  function restart() {
    setStep(0);
    setAnswers({ concerns: [] });
  }

  return (
    <div className="container py-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Beauty Quiz" }]} />

      <div className="mx-auto mt-6 max-w-2xl">
        <div className="mb-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-rosegold-dark">
            <Sparkles className="h-3.5 w-3.5" /> Beauty Quiz
          </span>
          <h1 className="mt-4 font-serif text-4xl font-semibold">
            Find your perfect routine
          </h1>
          <p className="mt-2 text-muted-foreground">
            Answer 3 quick questions for personalised recommendations.
          </p>
        </div>

        {!isResults && (
          <Progress value={((step + 1) / (total + 1)) * 100} className="mb-8" />
        )}

        <AnimatePresence mode="wait">
          {current && (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <h2 className="text-center font-serif text-2xl font-semibold">
                {current.question}
              </h2>
              <p className="mt-1 text-center text-sm text-muted-foreground">
                {current.help}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {current.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => pick(opt)}
                    className={cn(
                      "relative rounded-2xl border-2 p-4 text-sm font-medium transition-all hover:border-primary",
                      isSelected(opt)
                        ? "border-primary bg-secondary/40"
                        : "border-border"
                    )}
                  >
                    {isSelected(opt) && (
                      <span className="absolute right-2 top-2 grid h-5 w-5 place-items-center rounded-full bg-primary text-white">
                        <Check className="h-3 w-3" />
                      </span>
                    )}
                    {opt}
                  </button>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-between">
                <Button
                  variant="ghost"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0}
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                {current.multi && (
                  <Button onClick={() => setStep((s) => s + 1)}>
                    Continue <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </motion.div>
          )}

          {isResults && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <div className="rounded-3xl bg-secondary/40 p-6 text-center">
                <h2 className="font-serif text-2xl font-semibold">
                  Your personalised picks ✨
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Based on {answers.skinType ?? "your"} skin
                  {answers.concerns.length
                    ? ` · ${answers.concerns.slice(0, 3).join(", ")}`
                    : ""}
                </p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4">
                {recommendations.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>

              <div className="mt-8 flex justify-center gap-3">
                <Button variant="outline" onClick={restart}>
                  <RotateCcw className="h-4 w-4" /> Retake quiz
                </Button>
                <Button asChild>
                  <Link href="/shop">Shop all products</Link>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
