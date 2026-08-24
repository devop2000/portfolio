/**
 * 3D Interactive Portfolio Engine for SATHYADEVAN G
 * Includes Three.js 3D Background, 3D Photo Card Tilt, Parallax Layers, 
 * Typewriter, Modal Handlers, ATS Resume Exporter, and Interactive Filters.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  initThreeBg();
  initPhotoTilt();
  initTypewriter();
  initSkillFilters();
  initProjectFilters();
  initModals();
  initContactForm();
  initScrollSpy();
});

/* ==========================================================================
   1. THREE.JS 3D BACKGROUND ENGINE
   ========================================================================== */
function initThreeBg() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas || !window.THREE) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 80;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Particle Constellation
  const particleCount = window.innerWidth < 768 ? 90 : 160;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const velocities = [];

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 160;
    positions[i + 1] = (Math.random() - 0.5) * 160;
    positions[i + 2] = (Math.random() - 0.5) * 100;

    velocities.push({
      x: (Math.random() - 0.5) * 0.08,
      y: (Math.random() - 0.5) * 0.08,
      z: (Math.random() - 0.5) * 0.08,
    });
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  // Custom Particle Texture / Shader Material
  const pMaterial = new THREE.PointsMaterial({
    color: 0x00f0ff,
    size: 2.2,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending,
  });

  const particleSystem = new THREE.Points(geometry, pMaterial);
  scene.add(particleSystem);

  // Floating 3D Geometric Wireframes
  const geo1 = new THREE.IcosahedronGeometry(12, 1);
  const mat1 = new THREE.MeshBasicMaterial({
    color: 0xa855f7,
    wireframe: true,
    transparent: true,
    opacity: 0.15,
  });
  const mesh1 = new THREE.Mesh(geo1, mat1);
  mesh1.position.set(45, 15, -20);
  scene.add(mesh1);

  const geo2 = new THREE.TorusGeometry(10, 2.5, 12, 36);
  const mat2 = new THREE.MeshBasicMaterial({
    color: 0x10b981,
    wireframe: true,
    transparent: true,
    opacity: 0.12,
  });
  const mesh2 = new THREE.Mesh(geo2, mat2);
  mesh2.position.set(-45, -20, -30);
  scene.add(mesh2);

  // Connecting Lines between particles
  const linesMaterial = new THREE.LineBasicMaterial({
    color: 0x00f0ff,
    transparent: true,
    opacity: 0.12,
  });

  // Mouse Interaction
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
  });

  // Resize Handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate);

    // Smooth camera inertia
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;
    camera.position.x = targetX * 0.5;
    camera.position.y = -targetY * 0.5;
    camera.lookAt(scene.position);

    // Rotate meshes
    mesh1.rotation.x += 0.003;
    mesh1.rotation.y += 0.005;
    mesh2.rotation.x += 0.004;
    mesh2.rotation.z += 0.003;

    // Update particles
    const pos = geometry.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      pos[idx] += velocities[i].x;
      pos[idx + 1] += velocities[i].y;
      pos[idx + 2] += velocities[i].z;

      // Bounce at bounds
      if (Math.abs(pos[idx]) > 80) velocities[i].x *= -1;
      if (Math.abs(pos[idx + 1]) > 80) velocities[i].y *= -1;
      if (Math.abs(pos[idx + 2]) > 50) velocities[i].z *= -1;
    }
    geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }

  animate();
}

/* ==========================================================================
   2. 3D PHOTO CARD TILT & PARALLAX ENGINE
   ========================================================================== */
function initPhotoTilt() {
  const container = document.querySelector('.photo-card-container');
  const card = document.querySelector('.photo-3d-card');
  const glare = document.querySelector('.holo-glare');
  if (!container || !card) return;

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -18;
    const rotateY = ((x - centerX) / centerX) * 18;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

    if (glare) {
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.45) 0%, rgba(0,240,255,0.2) 30%, transparent 70%)`;
    }
  });

  container.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    card.style.transition = 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)';
    if (glare) {
      glare.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 60%)';
    }
  });

  container.addEventListener('mouseenter', () => {
    card.style.transition = 'none';
  });
}

/* ==========================================================================
   3. TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
  const target = document.getElementById('typewriter-text');
  if (!target) return;

  const roles = [
    'Technology Aspirant',
    'IT Support & Network Engineer',
    'CCNA Certified Enthusiast',
    'Systems & Server Administrator',
    'Hardware & PC Troubleshooting Specialist'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      target.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      target.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 1800; // Pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   5. SKILL & PROJECT FILTERING
   ========================================================================== */
function initSkillFilters() {
  const filterBtns = document.querySelectorAll('.skill-filter-btn');
  const skillCards = document.querySelectorAll('.skill-card-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active', 'bg-cyan-500/20', 'text-cyan-300', 'border-cyan-500'));
      btn.classList.add('active', 'bg-cyan-500/20', 'text-cyan-300', 'border-cyan-500');

      const filter = btn.dataset.filter;

      skillCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'block';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => { card.style.display = 'none'; }, 250);
        }
      });
    });
  });
}

function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active', 'bg-purple-500/20', 'text-purple-300', 'border-purple-500'));
      btn.classList.add('active', 'bg-purple-500/20', 'text-purple-300', 'border-purple-500');

      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.category.includes(filter)) {
          card.style.display = 'block';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => { card.style.display = 'none'; }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   6. MODAL HANDLERS (Resume & Project Details)
   ========================================================================== */
function initModals() {
  // Resume Modal
  const openResumeBtn = document.getElementById('open-resume-modal');
  const openResumeNav = document.getElementById('open-resume-nav');
  const resumeModal = document.getElementById('resume-modal');
  const closeResumeBtn = document.getElementById('close-resume-modal');
  const printResumeBtn = document.getElementById('print-resume-btn');
  const copyResumeBtn = document.getElementById('copy-resume-btn');

  function openResume() {
    if (!resumeModal) return;
    resumeModal.classList.remove('hidden');
    resumeModal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  function closeResume() {
    if (!resumeModal) return;
    resumeModal.classList.add('hidden');
    resumeModal.classList.remove('flex');
    document.body.style.overflow = 'auto';
  }

  if (openResumeBtn) openResumeBtn.addEventListener('click', openResume);
  if (openResumeNav) openResumeNav.addEventListener('click', openResume);
  if (closeResumeBtn) closeResumeBtn.addEventListener('click', closeResume);

  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) closeResume();
    });
  }

  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  if (copyResumeBtn) {
    copyResumeBtn.addEventListener('click', () => {
      const text = `SATHYADEVAN G
Technology Aspirant | Information Technology
Email: sathyadev28ae@gmail.com
Location: Karur, Tamil Nadu, India
LinkedIn: https://www.linkedin.com/in/sathya-devan-g-221807sa/
GitHub: https://github.com/devop2000

CAREER OBJECTIVE:
B.Tech IT graduate with a foundation in servers, networking, and system administration. Looking for an opportunity to apply my skills in a professional IT environment. Hands-on experience in server handling, network setup, and basic security practices. Eager to learn, adapt, and contribute to efficient IT operations.

EDUCATION:
- Bachelor of Technology in Information Technology - DS Engineering College, Perambalur, Tamil Nadu (May 2024)
- Diploma in Electrical and Electronics Engineering - Sita Rajaram Polytechnic College, Karur, Tamil Nadu (April 2018)

EXPERIENCE & INTERNSHIPS:
IT Support Intern – Daphne Infotech
- Comprehensive internship training covering A+ (Hardware & Troubleshooting), N+ (Networking Fundamentals), and CCNA (Routing & Switching) modules.
- Hands-on network configuration, routing/switching, hardware troubleshooting, and network issue resolution.

KEY SKILLS:
- Operating Systems: Windows 10/11, Windows Server, Basic Linux
- Hardware Support: PC assembly, troubleshooting, peripheral configuration, component diagnostics
- Networking: Basic LAN/WAN setup, IP addressing, Subnetting, DHCP, DNS, CCNA, Routing & Switching, VLANs
- Software Support: Installation, configuration, and troubleshooting of enterprise software
- Remote Support: AnyDesk, RDP, TeamViewer

CERTIFICATIONS:
- Computer Hardware & Networking – Systech Network Academy
- CCNA (Cisco Certified Network Associate) – Systech Network Academy`;

      navigator.clipboard.writeText(text).then(() => {
        showToast('Full Resume copied to clipboard!', 'success');
      });
    });
  }

  // Project Details Modal
  const projectDetailsModal = document.getElementById('project-modal');
  const closeProjectBtn = document.getElementById('close-project-modal');
  const projectCards = document.querySelectorAll('.project-card-item');

  const projectData = {
    proj1: {
      title: 'Enterprise LAN & Subnetting Infrastructure Design',
      role: 'Network Designer & Administrator',
      duration: 'Academic & Lab Capstone (2024)',
      tech: 'Cisco Packet Tracer, CCNA Protocols, IPv4 Subnetting (VLSM), VLANs, VTP, OSPF Routing, DHCP/DNS Servers, Access Control Lists',
      summary: 'Engineered a scalable multi-department corporate local area network featuring departmental segmentation, redundant routing paths, dynamic IP addressing, and access control policies.',
      keyOutcomes: [
        'Segmented 4 enterprise departments (HR, Engineering, IT, Finance) using 802.1Q VLANs for security & broadcast isolation.',
        'Configured inter-VLAN routing on Layer 3 switches with single-area OSPF for dynamic route convergence under 2 seconds.',
        'Implemented centralized DHCP pools and primary/secondary DNS servers with 99.9% uptime simulation.',
        'Applied standard & extended ACLs to restrict unauthorized inter-department communication and protect internal server farms.'
      ]
    },
    proj2: {
      title: 'Automated OS Deployment & Remote IT Helpdesk System',
      role: 'IT Support Engineer & Systems Specialist',
      duration: 'Daphne Infotech Internship Practice',
      tech: 'Windows Server, Windows 10/11 Pro, PowerShell Automation, Batch Scripting, AnyDesk Enterprise, RDP, Event Viewer',
      summary: 'Designed and deployed an automated system provisioning and remote helpdesk workflow to accelerate PC setup and provide instant remote troubleshooting for end-users.',
      keyOutcomes: [
        'Created modular PowerShell & Batch automation scripts to configure fresh Windows installs, install standard software suites, and apply security policies in under 15 minutes per device.',
        'Standardized remote desktop access protocols using AnyDesk and secure RDP tunnels for fast remote ticket resolution.',
        'Established system health monitoring procedures using Windows Event Viewer and Performance Monitor to diagnose BSOD and hardware bottlenecks.'
      ]
    },
    proj3: {
      title: 'Multi-Node Server Lab & Hardware Benchmarking Station',
      role: 'Hardware & Systems Assembly Engineer',
      duration: 'Hands-on Hardware Lab (2023 - 2024)',
      tech: 'Custom PC Assembly, Intel/AMD Chipsets, BIOS/UEFI Firmware, RAID Arrays (RAID 0/1/5), MemTest86, HWMonitor, Thermal Management',
      summary: 'Assembled, benchmarked, and maintained a multi-node hardware test lab designed to perform hardware fault simulation, thermal analysis, and storage redundancy testing.',
      keyOutcomes: [
        'Custom built and assembled multi-node test rigs with customized thermal paste application, airflow optimization, and cable management.',
        'Configured hardware and software RAID arrays for fault-tolerant data storage and conducted drive failure simulation recovery.',
        'Utilized BIOS flashing and diagnostic utilities (MemTest86, Prime95, CrystalDiskInfo) for rapid hardware validation.'
      ]
    },
    proj4: {
      title: 'Secure Office Network & Firewall Gateway Protection',
      role: 'Network Security Associate',
      duration: 'Systech Academy Capstone (2024)',
      tech: 'Network Address Translation (NAT/PAT), Port Security, Wi-Fi 6 Enterprise APs, MAC Filtering, Syslog, Wireshark',
      summary: 'Implemented a fortified gateway network incorporating NAT overload, switch port security with MAC address sticky binding, and Wi-Fi access security for enterprise environments.',
      keyOutcomes: [
        'Configured PAT (Port Address Translation) to allow 100+ simulated internal hosts to safely access public WAN interfaces using a single public IP.',
        'Enforced switch port security (MAC address limits & violation shutdown actions) preventing rogue DHCP/switch spoofing attacks.',
        'Analyzed packet captures using Wireshark to verify TCP three-way handshakes and eliminate network bottlenecks.'
      ]
    }
  };

  projectCards.forEach(card => {
    const viewBtn = card.querySelector('.view-project-btn');
    if (viewBtn) {
      viewBtn.addEventListener('click', () => {
        const id = card.dataset.projectId;
        const data = projectData[id];
        if (!data || !projectDetailsModal) return;

        document.getElementById('modal-proj-title').textContent = data.title;
        document.getElementById('modal-proj-role').textContent = data.role;
        document.getElementById('modal-proj-duration').textContent = data.duration;
        document.getElementById('modal-proj-tech').textContent = data.tech;
        document.getElementById('modal-proj-summary').textContent = data.summary;

        const outcomesList = document.getElementById('modal-proj-outcomes');
        outcomesList.innerHTML = '';
        data.keyOutcomes.forEach(outcome => {
          const li = document.createElement('li');
          li.className = 'flex items-start gap-3 text-slate-300';
          li.innerHTML = `<span class="text-cyan-400 mt-1">▹</span><span>${outcome}</span>`;
          outcomesList.appendChild(li);
        });

        projectDetailsModal.classList.remove('hidden');
        projectDetailsModal.classList.add('flex');
        document.body.style.overflow = 'hidden';
      });
    }
  });

  if (closeProjectBtn && projectDetailsModal) {
    closeProjectBtn.addEventListener('click', () => {
      projectDetailsModal.classList.add('hidden');
      projectDetailsModal.classList.remove('flex');
      document.body.style.overflow = 'auto';
    });

    projectDetailsModal.addEventListener('click', (e) => {
      if (e.target === projectDetailsModal) {
        projectDetailsModal.classList.add('hidden');
        projectDetailsModal.classList.remove('flex');
        document.body.style.overflow = 'auto';
      }
    });
  }
}

/* ==========================================================================
   7. CONTACT FORM & TOAST NOTIFICATIONS
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText('sathyadev28ae@gmail.com').then(() => {
        showToast('Email (sathyadev28ae@gmail.com) copied!', 'success');
      });
    });
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value;
      const email = document.getElementById('form-email').value;
      const subject = document.getElementById('form-subject').value;
      const message = document.getElementById('form-message').value;

      // Construct mailto link
      const mailtoUrl = `mailto:sathyadev28ae@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry from ' + name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

      window.open(mailtoUrl, '_blank');
      showToast('Opening default email client with your message!', 'success');
      form.reset();
    });
  }
}

/* ==========================================================================
   8. TOAST NOTIFICATION UTILITY
   ========================================================================== */
function showToast(message, type = 'info') {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  const borderColor = type === 'success' ? 'border-emerald-500 text-emerald-300' : 'border-cyan-500 text-cyan-300';
  const icon = type === 'success' ? '✓' : 'ℹ';

  toast.className = `pointer-events-auto flex items-center gap-3 px-5 py-3.5 rounded-xl bg-slate-900/90 backdrop-blur-xl border ${borderColor} shadow-2xl transition-all duration-300 transform translate-y-8 opacity-0`;
  toast.innerHTML = `
    <span class="font-bold text-lg">${icon}</span>
    <span class="text-sm font-medium text-slate-100">${message}</span>
  `;

  toastContainer.appendChild(toast);

  // Trigger enter animation
  setTimeout(() => {
    toast.classList.remove('translate-y-8', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
  }, 10);

  // Auto dismiss after 3.5s
  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-4', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/* ==========================================================================
   9. SCROLL SPY & ACTIVE NAV
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link-item');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('text-cyan-400', 'border-b-2', 'border-cyan-400');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('text-cyan-400', 'border-b-2', 'border-cyan-400');
          }
        });
      }
    });
  });
}
