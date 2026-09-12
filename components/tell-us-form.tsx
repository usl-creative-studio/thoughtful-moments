"use client";

import { useActionState, useEffect, useRef, type FocusEvent, type ReactNode } from "react";
import { track } from "@vercel/analytics";
import { Check, CircleAlert } from "lucide-react";
import { submitTellUs } from "@/app/actions/tell-us";
import {
  addDaysIso,
  dateWindowDays,
  fields,
  honeypotField,
  idleState,
  massageOptions,
  todayIso,
  type TellUsField,
  type TellUsValues,
} from "@/lib/tell-us";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

/**
 * Tell Us About Her (Module 9): the way in for a man not ready to hold a slot.
 * Copy is verbatim from usl-build/6-landing-page-copy.md. Five questions and
 * an email, one column at every width, labels above fields, no motion: he is
 * about to act, so nothing here waits on a reveal. Errors sit under their
 * field with an icon and are linked by aria-describedby; the first one takes
 * focus. On success the form is replaced by the thank-you inside a live region
 * that exists from the first render, so a screen reader hears it.
 */

/*
 * Base UI form controls are uncontrolled and warn if their defaultValue changes after
 * mount, so each one is keyed on its returned value: a field the action hands back
 * unchanged keeps its instance, a changed one remounts with the new default.
 */
const emptyValues: TellUsValues = { date: "", where: "", loves: "", said: "", massage: "", email: "" };

const id = (field: TellUsField | "where-hint" | "massage-label" | "message") => `tell-us-${field}`;

/** The message under a field, paired with an icon so colour never carries it alone. */
function FieldError({ field, message }: { field: TellUsField; message?: string }) {
  if (!message) return null;
  return (
    <p id={`${id(field)}-error`} className="mt-2 flex items-start gap-1.5 text-small text-error">
      <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <span>{message}</span>
    </p>
  );
}

/** Space-separated ids for aria-describedby, or undefined when there is nothing to point at. */
function describedBy(...ids: (string | false | undefined)[]): string | undefined {
  const list = ids.filter(Boolean);
  return list.length > 0 ? list.join(" ") : undefined;
}

function Field({ children }: { children: ReactNode }) {
  return <div className="mt-6 first:mt-0">{children}</div>;
}

export function TellUsForm() {
  const [state, action, pending] = useActionState(submitTellUs, idleState);
  const started = useRef(false);

  const done = state.status === "sent" || state.status === "discarded";
  const values = state.status === "error" ? state.values : emptyValues;
  const errors = state.status === "error" ? state.errors : {};
  const message = state.status === "error" ? state.message : undefined;

  useEffect(() => {
    if (state.status === "sent") track("form_submitted", { massage: state.massage });
  }, [state]);

  // After a rejected submit, focus lands on the first field with an error, or on the form-level
  // message. Base UI puts a radio's `id` on its hidden native input, so the group is focused
  // through its first visible radio instead.
  useEffect(() => {
    if (state.status !== "error") return;
    const first = fields.find((field) => state.errors[field]);
    const target =
      first === "massage"
        ? document.querySelector<HTMLElement>(`#${id("massage-label")} ~ [role="radiogroup"] [role="radio"]`)
        : document.getElementById(first ? id(first) : id("message"));
    target?.focus();
  }, [state]);

  const onFocusCapture = () => {
    if (started.current) return;
    started.current = true;
    track("form_started");
  };

  // The native picker learns the window when the field is first focused, so a page built
  // yesterday never carries yesterday's dates. The Server Action holds the real rule.
  const onDateFocus = (event: FocusEvent<HTMLInputElement>) => {
    const today = todayIso();
    event.currentTarget.min = today;
    event.currentTarget.max = addDaysIso(today, dateWindowDays);
  };

  return (
    <div id="tell-us" className="measure scroll-mt-8">
      <h3 className="text-h3 font-medium">Not ready? Tell us about her.</h3>
      <p className="mt-4 text-body">
        Five questions. We send back a plan for the night and the price, and nothing else.
      </p>

      <div role="status" aria-live="polite" className={done ? "mt-8" : "sr-only"}>
        {done ? (
          <p className="flex items-start gap-2 text-body">
            <Check className="mt-1 size-5 shrink-0 text-success" aria-hidden="true" />
            <span>
              <strong className="font-bold">Thank you. We will write back within two days</strong> with
              a plan for the night and the price.
            </span>
          </p>
        ) : pending ? (
          "Sending your answers."
        ) : null}
      </div>

      {done ? null : (
        <form action={action} onFocusCapture={onFocusCapture} noValidate className="mt-8">
          {message ? (
            <p
              id={id("message")}
              role="alert"
              tabIndex={-1}
              className="mb-6 flex items-start gap-1.5 text-body text-error"
            >
              <CircleAlert className="mt-1 size-5 shrink-0" aria-hidden="true" />
              <span>{message}</span>
            </p>
          ) : null}

          <Field>
            <Label htmlFor={id("date")}>Her birthday or your anniversary</Label>
            <Input
              key={values.date}
              id={id("date")}
              name="date"
              type="date"
              className="mt-2"
              defaultValue={values.date}
              onFocus={onDateFocus}
              aria-invalid={errors.date ? true : undefined}
              aria-describedby={describedBy(errors.date && `${id("date")}-error`)}
            />
            <FieldError field="date" message={errors.date} />
          </Field>

          <Field>
            <Label htmlFor={id("where")}>Where you live</Label>
            <p id={id("where-hint")} className="mt-1 text-small text-warm-grey">
              Dallas neighbourhood or ZIP
            </p>
            <Input
              key={values.where}
              id={id("where")}
              name="where"
              type="text"
              autoComplete="postal-code"
              className="mt-2"
              defaultValue={values.where}
              aria-invalid={errors.where ? true : undefined}
              aria-describedby={describedBy(id("where-hint"), errors.where && `${id("where")}-error`)}
            />
            <FieldError field="where" message={errors.where} />
          </Field>

          <Field>
            <Label htmlFor={id("loves")}>Three things she loves</Label>
            <Textarea
              id={id("loves")}
              name="loves"
              className="mt-2"
              defaultValue={values.loves}
              aria-invalid={errors.loves ? true : undefined}
              aria-describedby={describedBy(errors.loves && `${id("loves")}-error`)}
            />
            <FieldError field="loves" message={errors.loves} />
          </Field>

          <Field>
            <Label htmlFor={id("said")}>One thing she has said about you lately</Label>
            <Textarea
              id={id("said")}
              name="said"
              className="mt-2"
              defaultValue={values.said}
              aria-invalid={errors.said ? true : undefined}
              aria-describedby={describedBy(errors.said && `${id("said")}-error`)}
            />
            <FieldError field="said" message={errors.said} />
          </Field>

          <Field>
            <p id={id("massage-label")} className="text-small font-medium">
              Would you give her the massage yourself?
            </p>
            <RadioGroup
              key={values.massage}
              name="massage"
              defaultValue={values.massage || undefined}
              className="mt-3"
              aria-labelledby={id("massage-label")}
              aria-invalid={errors.massage ? true : undefined}
              aria-describedby={describedBy(errors.massage && `${id("massage")}-error`)}
            >
              {massageOptions.map((option) => (
                <div key={option.value} className="flex min-h-11 items-center gap-3">
                  <RadioGroupItem
                    id={`${id("massage")}-${option.value}`}
                    value={option.value}
                    aria-invalid={errors.massage ? true : undefined}
                  />
                  <Label htmlFor={`${id("massage")}-${option.value}`} className="text-body font-normal">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            <FieldError field="massage" message={errors.massage} />
          </Field>

          <Field>
            <Label htmlFor={id("email")}>Your email</Label>
            <Input
              key={values.email}
              id={id("email")}
              name="email"
              type="email"
              autoComplete="email"
              className="mt-2"
              defaultValue={values.email}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={describedBy(errors.email && `${id("email")}-error`)}
            />
            <FieldError field="email" message={errors.email} />
          </Field>

          {/* Honeypot: off screen, out of the tab order, hidden from assistive tech. A bot fills it. */}
          <div className="sr-only" aria-hidden="true">
            <label htmlFor={`tell-us-${honeypotField}`}>Leave this empty</label>
            <input
              id={`tell-us-${honeypotField}`}
              name={honeypotField}
              type="text"
              tabIndex={-1}
              autoComplete="off"
              defaultValue=""
            />
          </div>

          <div className="mt-8">
            <Button type="submit" disabled={pending} focusableWhenDisabled>
              {pending ? "Sending…" : "Send it"}
            </Button>
            <p className="mt-4 text-small text-warm-grey">
              We reply within two days. Your answers are used for the plan and nothing else.
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
