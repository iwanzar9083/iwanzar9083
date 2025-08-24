const Theme = {
	Auto: "auto",
	Dark: "dark",
	Light: "light",
};

const THEME_STORAGE_KEY = "preferred-theme";

function getStoredTheme() {
	try {
		return localStorage.getItem(THEME_STORAGE_KEY);
	} catch (_) {
		return null;
	}
}

function storeTheme(themeValue) {
	try {
		localStorage.setItem(THEME_STORAGE_KEY, themeValue);
	} catch (_) {
		/* no-op */
	}
}

function applyTheme(themeValue) {
	const html = document.documentElement;
	html.setAttribute("data-theme", themeValue);
}

function initializeTheme() {
	const stored = getStoredTheme();
	applyTheme(stored || Theme.Auto);
	const button = document.querySelector(".theme-toggle");
	if (!button) return;
	const isDark = (document.documentElement.getAttribute("data-theme") === Theme.Dark);
	button.setAttribute("aria-pressed", String(isDark));
}

function toggleTheme() {
	const current = document.documentElement.getAttribute("data-theme") || Theme.Auto;
	let next;
	if (current === Theme.Auto) {
		next = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? Theme.Light : Theme.Dark;
	} else if (current === Theme.Dark) {
		next = Theme.Light;
	} else {
		next = Theme.Dark;
	}
	applyTheme(next);
	storeTheme(next);
	const button = document.querySelector(".theme-toggle");
	if (button) button.setAttribute("aria-pressed", String(next === Theme.Dark));
}

function setupThemeToggle() {
	const button = document.querySelector(".theme-toggle");
	if (!button) return;
	button.addEventListener("click", toggleTheme);
}

function setupNavToggle() {
	const toggle = document.querySelector(".nav-toggle");
	const list = document.getElementById("nav-list");
	if (!toggle || !list) return;
	toggle.addEventListener("click", () => {
		const expanded = toggle.getAttribute("aria-expanded") === "true";
		toggle.setAttribute("aria-expanded", String(!expanded));
		list.classList.toggle("is-open");
	});
	list.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
		list.classList.remove("is-open");
		toggle.setAttribute("aria-expanded", "false");
	}));
}

function setupRevealAnimations() {
	const reveals = Array.from(document.querySelectorAll(".reveal"));
	if (!("IntersectionObserver" in window) || reveals.length === 0) {
		reveals.forEach((el) => el.classList.add("is-visible"));
		return;
	}
	const observer = new IntersectionObserver((entries, obs) => {
		for (const entry of entries) {
			if (entry.isIntersecting) {
				entry.target.classList.add("is-visible");
				obs.unobserve(entry.target);
			}
		}
	}, { threshold: 0.15 });
	reveals.forEach((el) => observer.observe(el));
}

function setCurrentYear() {
	const el = document.getElementById("year");
	if (el) el.textContent = String(new Date().getFullYear());
}

window.addEventListener("DOMContentLoaded", () => {
	initializeTheme();
	setupThemeToggle();
	setupNavToggle();
	setupRevealAnimations();
	setCurrentYear();
});