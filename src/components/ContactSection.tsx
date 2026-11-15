import {AlertCircle, CheckCircle2, Loader2, Send} from 'lucide-react';
import {motion} from 'motion/react';
import {useState, type FormEvent, type RefObject} from 'react';
import {
  isApiConfigured,
  submitContactForm,
  validateContactPayload,
  type ContactFieldErrors,
  type VisitorCountResult,
} from '../services/api';

interface ContactSectionProps {
  nameInputRef: RefObject<HTMLInputElement | null>;
  visitorState: VisitorCountResult;
}

interface FormNotice {
  type: 'success' | 'error';
  message: string;
}

export function ContactSection({nameInputRef, visitorState}: ContactSectionProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notice, setNotice] = useState<FormNotice | null>(null);

  const apiConfigured = isApiConfigured();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNotice(null);

    const validationErrors = validateContactPayload({name, email, message});
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      setNotice({
        type: 'error',
        message: 'Please review the highlighted fields before submitting.',
      });
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    const result = await submitContactForm({name, email, message});

    setIsSubmitting(false);

    if (result.ok) {
      setNotice({type: 'success', message: result.message});
      setName('');
      setEmail('');
      setMessage('');
      setFieldErrors({});
    } else {
      if (result.fieldErrors) {
        setFieldErrors(result.fieldErrors);
      }
      setNotice({type: 'error', message: result.message});
    }
  };

  const clearFieldError = (field: keyof ContactFieldErrors) => {
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = {...prev};
        delete next[field];
        return next;
      });
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          <motion.div
            initial={{opacity: 0, y: 14}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.2}}
            transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
            className="lg:col-span-5"
          >
            <p className="text-sm font-medium text-violet-300">Contact</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
              Start a Conversation
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-300">
              Have a question, an academic collaboration idea, or feedback on my work? Send a message directly through the form.
            </p>

            <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
              <div className="py-4">
                <p className="text-xs font-medium text-zinc-500">Backend Integration</p>
                <p className="mt-1 text-sm text-zinc-200">
                  Connected via <code className="font-mono text-xs text-lime-300">VITE_API_BASE_URL</code> to a standalone Python Flask API service.
                </p>
              </div>

              <div className="py-4">
                <p className="text-xs font-medium text-zinc-500">Supported Endpoints</p>
                <p className="mt-1 font-mono text-xs text-zinc-300">
                  POST /api/contact · GET /api/visitor-count
                </p>
              </div>

              <div className="py-4">
                <p className="text-xs font-medium text-zinc-500">Service Connection</p>
                <p className="mt-1 text-sm text-zinc-300">
                  {!apiConfigured
                    ? 'Awaiting VITE_API_BASE_URL environment configuration.'
                    : visitorState.status === 'connected'
                      ? 'Python Flask backend reachable.'
                      : 'VITE_API_BASE_URL configured; waiting for Flask response.'}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{opacity: 0, y: 14}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.2}}
            transition={{duration: 0.45, delay: 0.06, ease: [0.16, 1, 0.3, 1]}}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl border border-white/10 bg-[#0b0b10] p-6 sm:p-8"
            >
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-medium text-zinc-200"
                  >
                    Name
                  </label>
                  <input
                    ref={nameInputRef}
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                      clearFieldError('name');
                    }}
                    aria-invalid={Boolean(fieldErrors.name)}
                    aria-describedby={fieldErrors.name ? 'contact-name-error' : undefined}
                    placeholder="Your full name"
                    className="mt-2 block w-full min-h-[44px] rounded-lg border border-white/10 bg-[#060608] px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 transition-colors duration-150 focus:border-lime-400 focus:outline-none"
                  />
                  {fieldErrors.name && (
                    <p id="contact-name-error" className="mt-2 text-xs text-rose-400">
                      {fieldErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-medium text-zinc-200"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      clearFieldError('email');
                    }}
                    aria-invalid={Boolean(fieldErrors.email)}
                    aria-describedby={fieldErrors.email ? 'contact-email-error' : undefined}
                    placeholder="you@example.com"
                    className="mt-2 block w-full min-h-[44px] rounded-lg border border-white/10 bg-[#060608] px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 transition-colors duration-150 focus:border-lime-400 focus:outline-none"
                  />
                  {fieldErrors.email && (
                    <p id="contact-email-error" className="mt-2 text-xs text-rose-400">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-medium text-zinc-200"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    value={message}
                    onChange={(event) => {
                      setMessage(event.target.value);
                      clearFieldError('message');
                    }}
                    aria-invalid={Boolean(fieldErrors.message)}
                    aria-describedby={fieldErrors.message ? 'contact-message-error' : undefined}
                    placeholder="Write your message here..."
                    className="mt-2 block w-full rounded-lg border border-white/10 bg-[#060608] px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 transition-colors duration-150 focus:border-lime-400 focus:outline-none resize-y"
                  />
                  {fieldErrors.message && (
                    <p id="contact-message-error" className="mt-2 text-xs text-rose-400">
                      {fieldErrors.message}
                    </p>
                  )}
                </div>

                {notice && (
                  <div
                    role={notice.type === 'error' ? 'alert' : 'status'}
                    className={`flex items-start gap-3 rounded-xl border p-4 text-sm ${
                      notice.type === 'success'
                        ? 'border-lime-400/30 bg-lime-400/10 text-lime-200'
                        : 'border-rose-400/30 bg-rose-500/10 text-rose-200'
                    }`}
                  >
                    {notice.type === 'success' ? (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-lime-300" aria-hidden="true" />
                    ) : (
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" aria-hidden="true" />
                    )}
                    <p className="leading-relaxed">{notice.message}</p>
                  </div>
                )}

                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-lime-400 px-6 py-3 text-sm font-semibold text-zinc-950 transition-colors duration-150 hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-65 sm:w-auto cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        <span>Sending Message…</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" aria-hidden="true" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
