export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export interface ContactFieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

export interface ContactSubmitResult {
  ok: boolean;
  message: string;
  fieldErrors?: ContactFieldErrors;
}

export interface VisitorCountResult {
  status: 'connected' | 'unconfigured' | 'error';
  count: number | null;
  error?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function getApiBaseUrl(): string {
  const raw = import.meta.env.VITE_API_BASE_URL;
  if (typeof raw !== 'string') {
    return '';
  }
  return raw.trim().replace(/\/+$/, '');
}

export function isApiConfigured(): boolean {
  return getApiBaseUrl().length > 0;
}

export function validateContactPayload(payload: ContactPayload): ContactFieldErrors {
  const errors: ContactFieldErrors = {};
  const trimmedName = payload.name.trim();
  const trimmedEmail = payload.email.trim();
  const trimmedMessage = payload.message.trim();

  if (!trimmedName) {
    errors.name = 'Please enter your name.';
  } else if (trimmedName.length < 2) {
    errors.name = 'Name should be at least 2 characters long.';
  } else if (trimmedName.length > 100) {
    errors.name = 'Name must be 100 characters or fewer.';
  }

  if (!trimmedEmail) {
    errors.email = 'Please enter your email address.';
  } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!trimmedMessage) {
    errors.message = 'Please enter a message.';
  } else if (trimmedMessage.length < 10) {
    errors.message = 'Message should be at least 10 characters long.';
  } else if (trimmedMessage.length > 2000) {
    errors.message = 'Message must be 2000 characters or fewer.';
  }

  return errors;
}

export async function submitContactForm(
  payload: ContactPayload,
  signal?: AbortSignal,
): Promise<ContactSubmitResult> {
  const sanitized: ContactPayload = {
    name: payload.name.trim(),
    email: payload.email.trim(),
    message: payload.message.trim(),
  };

  const fieldErrors = validateContactPayload(sanitized);
  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      message: 'Please correct the highlighted fields before sending.',
      fieldErrors,
    };
  }

  const baseUrl = getApiBaseUrl();
  if (!baseUrl) {
    return {
      ok: false,
      message:
        'Python Flask backend URL (VITE_API_BASE_URL) is not configured yet. Set VITE_API_BASE_URL in your environment to connect POST /api/contact.',
    };
  }

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 10000);

  const forwardAbort = () => controller.abort();
  if (signal) {
    if (signal.aborted) {
      window.clearTimeout(timeoutId);
      return {ok: false, message: 'Request was cancelled.'};
    }
    signal.addEventListener('abort', forwardAbort, {once: true});
  }

  try {
    const response = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(sanitized),
      signal: controller.signal,
    });

    let data: Record<string, unknown> | null = null;
    const contentType = response.headers.get('content-type') ?? '';
    if (contentType.includes('application/json')) {
      data = (await response.json()) as Record<string, unknown>;
    }

    if (!response.ok) {
      const serverMessage =
        (typeof data?.error === 'string' && data.error) ||
        (typeof data?.message === 'string' && data.message) ||
        `The server responded with status ${response.status}.`;

      const serverFieldErrors: ContactFieldErrors | undefined =
        data?.errors && typeof data.errors === 'object'
          ? (data.errors as ContactFieldErrors)
          : undefined;

      return {
        ok: false,
        message: serverMessage,
        fieldErrors: serverFieldErrors,
      };
    }

    const successMessage =
      (typeof data?.message === 'string' && data.message) ||
      'Thank you! Your message has been delivered to the Python backend.';

    return {
      ok: true,
      message: successMessage,
    };
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      return {
        ok: false,
        message: 'The request timed out while contacting the Python backend. Please try again.',
      };
    }

    return {
      ok: false,
      message:
        'Unable to reach the Python Flask service. Confirm that the backend server is running and CORS is enabled.',
    };
  } finally {
    window.clearTimeout(timeoutId);
    if (signal) {
      signal.removeEventListener('abort', forwardAbort);
    }
  }
}

export async function fetchVisitorCount(signal?: AbortSignal): Promise<VisitorCountResult> {
  const baseUrl = getApiBaseUrl();
  if (!baseUrl) {
    return {
      status: 'unconfigured',
      count: null,
    };
  }

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 8000);

  const forwardAbort = () => controller.abort();
  if (signal) {
    if (signal.aborted) {
      window.clearTimeout(timeoutId);
      return {status: 'error', count: null, error: 'Request cancelled.'};
    }
    signal.addEventListener('abort', forwardAbort, {once: true});
  }

  try {
    const response = await fetch(`${baseUrl}/api/visitor-count`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      return {
        status: 'error',
        count: null,
        error: `Backend returned status ${response.status}.`,
      };
    }

    const data = (await response.json()) as Record<string, unknown>;
    const candidate = data.count ?? data.visitor_count ?? data.visitors ?? data.total;

    if (typeof candidate === 'number' && Number.isFinite(candidate)) {
      return {
        status: 'connected',
        count: candidate,
      };
    }

    return {
      status: 'error',
      count: null,
      error: 'Unexpected response format from /api/visitor-count.',
    };
  } catch {
    return {
      status: 'error',
      count: null,
      error: 'Python Flask service is currently unreachable.',
    };
  } finally {
    window.clearTimeout(timeoutId);
    if (signal) {
      signal.removeEventListener('abort', forwardAbort);
    }
  }
}
