(() => {
  "use strict";

  // ================= FORM VALIDATION =================

  const forms = document.querySelectorAll(".needs-validation");

  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });

  // ================= CARD HOVER =================

  document.querySelectorAll(".listing-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px)";
      card.style.transition = ".35s";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
    });
  });

  // ================= HEART ANIMATION =================

  document.querySelectorAll(".fa-heart").forEach((heart) => {
    heart.addEventListener("click", () => {
      heart.classList.toggle("fa-solid");
      heart.classList.toggle("fa-regular");

      heart.style.transform = "scale(1.3)";

      setTimeout(() => {
        heart.style.transform = "scale(1)";
      }, 200);
    });
  });

  // ================= SCROLL ANIMATION =================

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show-element");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  document.querySelectorAll(".fade-up").forEach((el) => {
    observer.observe(el);
  });

})();