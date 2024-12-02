// script.js

let profiles = [];
let currentProfileIndex = null;

// Seleção de elementos
const profilesList = document.getElementById('profiles-list');
const formSection = document.getElementById('form-section');
const previewSection = document.getElementById('preview-section');
const profileForm = document.getElementById('profile-form');
const addProfileBtn = document.getElementById('add-profile-btn');
const cancelBtn = document.getElementById('cancel-btn');
const editBtn = document.getElementById('edit-btn');
const downloadPdfBtn = document.getElementById('download-pdf-btn');

// Campos do formulário
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const experienceInput = document.getElementById('experience');
const skillsInput = document.getElementById('skills');

// Campos da pré-visualização
const previewName = document.getElementById('preview-name');
const previewEmail = document.getElementById('preview-email');
const previewExperience = document.getElementById('preview-experience');
const previewSkills = document.getElementById('preview-skills');

// Carregar perfis do localStorage ao iniciar
document.addEventListener('DOMContentLoaded', () => {
  profiles = JSON.parse(localStorage.getItem('profiles')) || [];
  renderProfiles();
});

// Renderiza a lista de perfis
function renderProfiles() {
  profilesList.innerHTML = '';
  profiles.forEach((profile, index) => {
    const card = document.createElement('div');
    card.className = 'profile-card';
    card.textContent = profile.name;
    card.onclick = () => viewProfile(index);
    profilesList.appendChild(card);
  });
}

// Adiciona um novo perfil
addProfileBtn.onclick = () => {
  currentProfileIndex = null;
  formSection.classList.remove('hidden');
  previewSection.classList.add('hidden');
  profileForm.reset();
};

// Cancela a edição ou criação
cancelBtn.onclick = () => {
  formSection.classList.add('hidden');
};

// Salva o perfil no localStorage
profileForm.onsubmit = (e) => {
  e.preventDefault();

  const profile = {
    name: nameInput.value,
    email: emailInput.value,
    experience: experienceInput.value,
    skills: skillsInput.value,
  };

  if (currentProfileIndex !== null) {
    profiles[currentProfileIndex] = profile;
  } else {
    profiles.push(profile);
  }

  localStorage.setItem('profiles', JSON.stringify(profiles));
  formSection.classList.add('hidden');
  renderProfiles();
};

// Visualiza um perfil
function viewProfile(index) {
  const profile = profiles[index];
  currentProfileIndex = index;

  previewName.textContent = profile.name;
  previewEmail.textContent = profile.email;
  previewExperience.textContent = profile.experience;
  previewSkills.textContent = profile.skills;

  formSection.classList.add('hidden');
  previewSection.classList.remove('hidden');
}

// Edita um perfil
editBtn.onclick = () => {
  const profile = profiles[currentProfileIndex];

  nameInput.value = profile.name;
  emailInput.value = profile.email;
  experienceInput.value = profile.experience;
  skillsInput.value = profile.skills;

  previewSection.classList.add('hidden');
  formSection.classList.remove('hidden');
};

// Baixa o currículo como PDF
downloadPdfBtn.onclick = () => {
  const profile = profiles[currentProfileIndex];
  const { jsPDF } = window.jspdf;

  const doc = new jsPDF();
  doc.text(`Currículo de ${profile.name}`, 10, 10);
  doc.text(`Email: ${profile.email}`, 10, 20);
  doc.text(`Experiência:`, 10, 30);
  doc.text(profile.experience, 10, 40);
  doc.text(`Habilidades:`, 10, 60);
  doc.text(profile.skills, 10, 70);

  doc.save(`${profile.name}-curriculo.pdf`);
};
