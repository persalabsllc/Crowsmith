'use strict';

const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
  mobileNav.hidden = true;
}
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  mobileNav.hidden = !open;
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
window.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
window.matchMedia('(min-width: 701px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
const header = document.getElementById('header');
window.addEventListener('scroll', () => header.classList.toggle('is-scrolled', window.scrollY > 30), { passive: true });

const practices = {
  criminal: {
    title: 'Criminal Defense', icon: 'shield',
    lead: 'A careful defense. A clear voice. Your future at the center.',
    body: 'Crow & Smith represents clients facing criminal charges in North Carolina state and federal courts. The team brings experience as defense counsel, a former prosecutor, and a retired judge to the details of each case. From an initial charge to a record-clearing request, your situation deserves individual attention.',
    services: ['Misdemeanor and felony defense', 'State and federal criminal cases', 'Assault, drug, and theft charges', 'Juvenile defense', 'Probation and post-conviction matters', 'Expungement eligibility and petitions']
  },
  family: {
    title: 'Family Law', icon: 'family',
    lead: 'Guidance for a difficult chapter. Perspective for the one ahead.',
    body: 'Family changes can bring deeply personal decisions. Crow & Smith helps clients understand their options, define their priorities, and address the legal issues surrounding separation, parenting, and financial support. The approach is grounded in your circumstances and your family’s long-term needs.',
    services: ['Divorce and separation', 'Child custody and visitation', 'Child support and alimony', 'Marital property and asset division', 'Prenuptial and postnuptial agreements', 'Domestic violence and protective orders']
  },
  military: {
    title: 'Military Defense', icon: 'star',
    lead: 'Counsel that understands service—and what is at stake.',
    body: 'Military proceedings can affect a service member’s career, reputation, and benefits. Guy Smith’s Marine Corps legal background includes service as a prosecutor, defense counsel, and Battalion Judge Advocate. He represents service members in criminal and administrative military matters throughout Eastern North Carolina.',
    services: ['Court-martial defense', 'Administrative separation', 'Boards of Inquiry', 'NCIS and command investigations', 'GOMOR rebuttals and appeals', 'Discharge and military record corrections']
  },
  traffic: {
    title: 'Traffic Violations', icon: 'road',
    lead: 'Protecting the things that keep your life moving.',
    body: 'A traffic matter deserves attention to the facts and its potential effect on your license and driving record. Crow & Smith assists local and out-of-state drivers with cases in Craven, Carteret, Pamlico, and Jones counties. The team reviews the charge and explains the options available in your circumstances.',
    services: ['Speeding and reckless driving', 'DWI defense', 'Driving while license revoked', 'Commercial driver violations', 'Registration and inspection issues', 'Failure to stop, yield, and other citations']
  }
};
const people = {
  guy: {
    name: 'Guy Smith', role: 'MANAGING PARTNER', image: '/assets/guy-smith.webp',
    lead: 'Military experience. Personal commitment.',
    paragraphs: [
      'Guy leads Crow & Smith’s work in criminal defense, family law, and military justice. A Tulane University Law School graduate, cum laude, he served ten years on active duty in the U.S. Marine Corps as a prosecutor, defense counsel, and Battalion Judge Advocate.',
      'His civilian practice includes state and federal criminal cases, child custody, and divorce. He also represents service members in courts-martial, administrative proceedings, and military record matters. Guy is admitted in North Carolina and Massachusetts.'
    ],
    highlights: ['J.D., Tulane University Law School, cum laude', 'Williams College graduate', 'Former Marine Corps prosecutor and defense counsel']
  },
  ken: {
    name: 'Kenneth F. Crow', role: 'SENIOR PARTNER', image: '/assets/kenneth-crow.webp',
    lead: 'A perspective earned on both sides of the bench.',
    paragraphs: [
      'A North Carolina native, Ken brings more than 35 years in law to his practice. Before returning to criminal defense, he served as an Assistant District Attorney, District Court Judge, and Superior Court Judge. His public service spanned 25 years.',
      'Ken’s practice focuses on state and federal criminal defense, including felony and misdemeanor cases, traffic matters, probation and parole violations, and post-conviction issues. He is a graduate of UNC–Chapel Hill and Campbell University Law School.'
    ],
    highlights: ['Former North Carolina Superior Court Judge', 'Former District Court Judge and prosecutor', 'Over 35 years of legal experience']
  }
};
const dialog = document.getElementById('detail-dialog');
const detailContent = document.getElementById('detail-content');
const icon = name => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
let lastDialogTrigger;
function openDialog(content, trigger) {
  lastDialogTrigger = trigger;
  detailContent.innerHTML = content;
  dialog.showModal();
  document.body.classList.add('dialog-open');
  dialog.scrollTop = 0;
}
function closeDialog() { dialog.close(); }
dialog.querySelector('.dialog-close').addEventListener('click', closeDialog);
dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) closeDialog(); } });
dialog.addEventListener('close', () => { document.body.classList.remove('dialog-open'); lastDialogTrigger?.focus({ preventScroll: true }); });
document.querySelectorAll('[data-practice]').forEach(button => button.addEventListener('click', () => {
  const key = button.dataset.practice;
  const data = practices[key];
  openDialog(`<div class="detail-practice"><svg class="practice-icon" aria-hidden="true"><use href="#i-${data.icon}"/></svg><p class="eyebrow">OUR PRACTICE</p><h2 id="detail-title">${data.title}</h2><p class="detail-lead">${data.lead}</p><p class="detail-body">${data.body}</p><ul class="detail-services">${data.services.map(service => `<li>${service}</li>`).join('')}</ul><div class="detail-actions"><button class="button button-ink" type="button" data-consult="${key}">Discuss Your Situation ${icon('arrow')}</button><a class="text-link" href="tel:+12526311270">252.631.1270</a></div></div>`, button);
}));
document.querySelectorAll('[data-person]').forEach(button => button.addEventListener('click', () => {
  const data = people[button.dataset.person];
  openDialog(`<div class="detail-person"><img src="${data.image}" alt="${data.name}"><div class="detail-person-copy"><p class="eyebrow">${data.role}</p><h2 id="detail-title">${data.name}</h2><p class="detail-lead">${data.lead}</p>${data.paragraphs.map(paragraph => `<p class="detail-body">${paragraph}</p>`).join('')}<ul class="detail-services">${data.highlights.map(item => `<li>${item}</li>`).join('')}</ul><button class="button button-ink" type="button" data-consult="">Request a Consultation ${icon('arrow')}</button></div></div>`, button);
}));
detailContent.addEventListener('click', event => {
  const button = event.target.closest('[data-consult]');
  if (!button) return;
  closeDialog();
  if (button.dataset.consult) document.getElementById('practice-select').value = button.dataset.consult;
  document.getElementById('contact').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  history.replaceState(null, '', '#contact');
});

// Demonstration only: no network request, storage, or real message delivery.
const form = document.getElementById('consultation-form');
const formSuccess = document.getElementById('form-success');
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  form.reset();
  form.hidden = true;
  document.querySelector('.form-heading').hidden = true;
  formSuccess.hidden = false;
  formSuccess.focus({ preventScroll: true });
  formSuccess.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center' });
});
document.getElementById('reset-form').addEventListener('click', () => {
  formSuccess.hidden = true;
  document.querySelector('.form-heading').hidden = false;
  form.hidden = false;
  form.querySelector('input').focus({ preventScroll: true });
});
