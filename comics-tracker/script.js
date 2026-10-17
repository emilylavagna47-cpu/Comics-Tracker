/* === 1. DATI INIZIALI DELLA COLLEZIONE === */
    // Array di oggetti contenente le 5 serie mostrate nel design originale
    const initialSeries = [
      {
        id: 1,
        title: "One Piece",
        type: "manga",
        subCategory: "Shonen",
        code: "OP-106",
        icon: "sailing",
        currentVol: 106,
        totalVol: 108,
        statusText: "In corso",
        statusColor: "status-green",
        subDetailText: "Ultimo letto: Cap. 1090",
        footerText: "Aggiornato 2gg fa",
        coverTheme: "cover-violet",
        plot: "Monkey D. Rufy salpa con la sua ciurma per esplorare la Rotta Maggiore alla ricerca del tesoro più grande del mondo, il leggendario 'One Piece', inseguendo il sogno di diventare il Re dei Pirati."
      },
      {
        id: 2,
        title: "Spider-Man",
        type: "comic",
        subCategory: "Marvel",
        code: "SPD-24",
        icon: "token",
        currentVol: 24,
        totalVol: 30,
        statusText: "Mensile",
        statusColor: "status-violet",
        subDetailText: "Prossima uscita: 15 Maggio",
        footerText: "In edicola / fumetteria",
        coverTheme: "cover-ruby",
        plot: "Peter Parker affronta i pericoli della vita quotidiana tra lavoro, università e le sue immense responsabilità da supereroe, proteggendo New York dalle più pericolose minacce."
      },
      {
        id: 3,
        title: "Jujutsu Kaisen",
        type: "manga",
        subCategory: "Shonen",
        code: "JJK-22",
        icon: "local_fire_department",
        currentVol: 22,
        totalVol: 26,
        statusText: "84%",
        statusColor: "status-cyan",
        subDetailText: "Avanzamento serie: 22 su 26",
        footerText: "Ultima lettura: ieri",
        coverTheme: "cover-cyan",
        plot: "Yuji Itadori, uno studente delle superiori con capacità fisiche straordinarie, ingerisce un feticcio maledetto per salvare i suoi compagni, legandosi allo spirito del leggendario re delle maledizioni Ryomen Sukuna."
      },
      {
        id: 4,
        title: "Batman: Detective Comics",
        type: "comic",
        subCategory: "DC",
        code: "BAT-04",
        icon: "shield",
        currentVol: 4,
        totalVol: 4,
        statusText: "Allineato",
        statusColor: "status-green",
        subDetailText: "Completato fino al vol. 4",
        footerText: "Serie in pari con l'edizione IT",
        coverTheme: "cover-blue",
        plot: "A Gotham City, Bruce Wayne indossa il mantello di Batman per combattere il crimine organizzato e le follie dei criminali di Arkham Asylum, mettendo alla prova le sue doti da miglior detective al mondo."
      },
      {
        id: 5,
        title: "Berserk",
        type: "manga",
        subCategory: "Seinen",
        code: "BRK-41",
        icon: "swords",
        currentVol: 41,
        totalVol: 42,
        statusText: "Pausa",
        statusColor: "status-amber",
        subDetailText: "In attesa ristampa",
        footerText: "Panini Comics / Planet Manga",
        coverTheme: "cover-amber",
        plot: "Nel cupo medioevo fantasy delle Midlands, Gatsu, un formidabile mercenario armato della gigantesca spada Ammazzadraghi, viaggia affrontando orrori demoniaci e il marchio infame del destino."
      }
    ];

    // Variabili di stato: serie attuali e filtro di visualizzazione attivo
    let seriesList = [...initialSeries];
    let currentFilter = 'all';
    let currentSort = 'default';
    let currentStatusFilter = 'all';
    let currentSubcategoryFilter = 'all';

    /* === 2. SELEZIONE ELEMENTI DOM === */
    // Contenitori ed etichette
    const seriesListContainer = document.querySelector('#seriesList');
    const seriesCountLabel = document.querySelector('#seriesCountLabel');
    const totalVolumesBadge = document.querySelector('#totalVolumesBadge');

    // Pulsanti filtri
    const filterAllBtn = document.querySelector('#filterAll');
    const filterMangaBtn = document.querySelector('#filterManga');
    const filterComicBtn = document.querySelector('#filterComic');

    // Modale Aggiungi Serie
    const addSeriesModal = document.querySelector('#addSeriesModal');
    const openAddSeriesBtn = document.querySelector('#openAddSeriesBtn');
    const summaryAddSeriesBtn = document.querySelector('#summaryAddSeriesBtn');
    const closeAddSeriesBtn = document.querySelector('#closeAddSeriesBtn');
    const addSeriesForm = document.querySelector('#addSeriesForm');
    const seriesCategorySelect = document.querySelector('#seriesCategorySelect');
    const seriesSubcategorySelect = document.querySelector('#seriesSubcategorySelect');
    const seriesSubcategoryLabel = document.querySelector('#seriesSubcategoryLabel');
    const seriesCoverThemeSelect = document.querySelector('#seriesCoverThemeSelect');

    // Modale Registra Volume
    const addVolumeModal = document.querySelector('#addVolumeModal');
    const openAddVolumeBtn = document.querySelector('#openAddVolumeBtn');
    const summaryAddVolumeBtn = document.querySelector('#summaryAddVolumeBtn');
    const closeAddVolumeBtn = document.querySelector('#closeAddVolumeBtn');
    const addVolumeForm = document.querySelector('#addVolumeForm');
    const selectSeriesDropdown = document.querySelector('#selectSeriesDropdown');
    const volumePreviewBox = document.querySelector('#volumePreviewBox');

    // Modale Dettagli / Trama e Modifica Stato
    const detailsModal = document.querySelector('#detailsModal');
    const closeDetailsBtn = document.querySelector('#closeDetailsBtn');
    const closeDetailsBottomBtn = document.querySelector('#closeDetailsBottomBtn');
    const detailsModalHeading = document.querySelector('#detailsModalHeading');
    const detailsCategoryBadge = document.querySelector('#detailsCategoryBadge');
    const detailsVolumeBadge = document.querySelector('#detailsVolumeBadge');
    const detailsPlotContent = document.querySelector('#detailsPlotContent');
    const detailsStatusSelect = document.querySelector('#detailsStatusSelect');
    const detailsCustomStatusInput = document.querySelector('#detailsCustomStatusInput');
    const saveDetailsStatusBtn = document.querySelector('#saveDetailsStatusBtn');
    let currentDetailsSeriesId = null;

    // Modale Ordina e Filtra
    const sortFilterModal = document.querySelector('#sortFilterModal');
    const openSortFilterBtn = document.querySelector('#openSortFilterBtn');
    const closeSortFilterBtn = document.querySelector('#closeSortFilterBtn');
    const sortFilterForm = document.querySelector('#sortFilterForm');
    const sortBySelect = document.querySelector('#sortBySelect');
    const filterStatusSelect = document.querySelector('#filterStatusSelect');
    const filterSubcategorySelect = document.querySelector('#filterSubcategorySelect');
    const resetSortFilterBtn = document.querySelector('#resetSortFilterBtn');

    /* === 3. FUNZIONE DI RENDERING DELLE SCHEDE === */
    // Genera l'HTML di ciascuna scheda fumetto e aggiorna i contatori
    function renderSeries() {
      // 1. Pulizia del contenitore
      seriesListContainer.innerHTML = '';

      // 2. Filtraggio principale per categoria (Tutti, Manga, Comics)
      let filteredSeries = seriesList.filter(function(series) {
        if (currentFilter === 'all') return true;
        return series.type === currentFilter;
      });

      // 3. Filtro avanzato per Stato (se selezionato)
      if (currentStatusFilter !== 'all') {
        filteredSeries = filteredSeries.filter(function(series) {
          return series.statusText === currentStatusFilter;
        });
      }

      // 4. Filtro avanzato per Target / Universo (se selezionato)
      if (currentSubcategoryFilter !== 'all') {
        filteredSeries = filteredSeries.filter(function(series) {
          return series.subCategory === currentSubcategoryFilter;
        });
      }

      // 5. Ordinamento della lista
      filteredSeries.sort(function(a, b) {
        if (currentSort === 'title-asc') {
          return a.title.localeCompare(b.title);
        } else if (currentSort === 'title-desc') {
          return b.title.localeCompare(a.title);
        } else if (currentSort === 'vol-desc') {
          return (Number(b.currentVol) || 0) - (Number(a.currentVol) || 0);
        } else if (currentSort === 'vol-asc') {
          return (Number(a.currentVol) || 0) - (Number(b.currentVol) || 0);
        } else if (currentSort === 'progress-desc') {
          const progA = a.currentVol / (a.totalVol || a.currentVol);
          const progB = b.currentVol / (b.totalVol || b.currentVol);
          return progB - progA;
        }
        return 0; // Default
      });

      // 6. Evidenzia visivamente l'icona se sono attivi criteri non predefiniti
      const isCustomFilterActive = (currentSort !== 'default' || currentStatusFilter !== 'all' || currentSubcategoryFilter !== 'all');
      if (isCustomFilterActive) {
        openSortFilterBtn.classList.add('active');
      } else {
        openSortFilterBtn.classList.remove('active');
      }

      // 7. Generazione delle card
      if (filteredSeries.length === 0) {
        seriesListContainer.innerHTML = '<div class="empty-state">Nessuna serie trovata in questa categoria.</div>';
      } else {
        filteredSeries.forEach(function(series) {
          // Calcolo della percentuale per la barra di progresso
          const progressPercent = Math.min(100, Math.round((series.currentVol / (series.totalVol || series.currentVol)) * 100));

          // Creazione dell'elemento <article> semantico
          const card = document.createElement('article');
          card.className = 'series-card';
          card.setAttribute('aria-label', series.title);

          card.innerHTML = `
            <div class="tech-corner" aria-hidden="true"></div>
            <div class="card-top">
              <!-- Copertina Cyber stilizzata -->
              <div class="card-cover ${series.coverTheme}">
                <div class="cover-header">
                  <span class="cover-header-dot"></span>
                  <span class="cover-header-index">${series.id < 10 ? '0' + series.id : series.id}</span>
                </div>
                <div class="cover-body">
                  <span class="material-symbols-rounded" style="color:var(--coral-primary);">${series.icon || 'book'}</span>
                  <span class="cover-code">${series.code}</span>
                </div>
                <span class="cover-type-badge">${series.subCategory ? series.subCategory.toUpperCase() : series.type.toUpperCase()}</span>
              </div>

              <!-- Dati serie e avanzamento -->
              <div class="card-info">
                <div class="card-title-row">
                  <h3 class="card-title">${series.title}</h3>
                  <span class="status-badge ${series.statusColor}">
                    <span class="status-dot-mini"></span>${series.statusText}
                  </span>
                </div>
                <p class="card-volume-text">
                  Volume attuale: <span class="card-volume-num">Vol. ${series.currentVol}</span> 
                  <span class="card-volume-total">/ ${series.totalVol ? series.totalVol : 'In corso'}</span>
                </p>
                <div class="card-subdetail">
                  <span class="material-symbols-rounded">menu_book</span>
                  <span>${series.subDetailText}</span>
                </div>
                <!-- Barra di progresso neon -->
                <div class="progress-bar-container" title="${progressPercent}% letto">
                  <div class="progress-bar-fill" style="width: ${progressPercent}%;"></div>
                </div>
              </div>
            </div>

            <!-- Footer card con data e pulsanti -->
            <div class="card-footer">
              <span class="card-footer-info">
                <span class="material-symbols-rounded">schedule</span>
                ${series.footerText}
              </span>
              <div class="card-buttons">
                <button class="btn-card-details" type="button" data-id="${series.id}">Dettagli</button>
                <button class="btn-card-add-vol" type="button" data-id="${series.id}">
                  <span class="material-symbols-rounded" style="font-size:14px;">add</span>
                  <span>+1 Vol</span>
                </button>
              </div>
            </div>
          `;

          // Aggiunge la card al contenitore
          seriesListContainer.appendChild(card);
        });
      }

      // 4. Aggiornamento dei contatori globali e delle pillole
      updateCounters();
      // 5. Collegamento degli eventi ai pulsanti interni alle card appena create
      attachCardEvents();
    }

    /* === 4. FUNZIONE AGGIORNAMENTO CONTATORI === */
    // Ricalcola il numero di albi e le statistiche dei pulsanti filtri
    function updateCounters() {
      const totalCount = seriesList.length;
      const mangaCount = seriesList.filter(function(s) { return s.type === 'manga'; }).length;
      const comicCount = seriesList.filter(function(s) { return s.type === 'comic'; }).length;

      // Calcolo somma di tutti i volumi posseduti
      let totalVolumes = 0;
      seriesList.forEach(function(s) {
        totalVolumes += Number(s.currentVol) || 0;
      });

      // Aggiornamento etichette a video
      seriesCountLabel.textContent = totalCount + ' serie in corso';
      totalVolumesBadge.textContent = 'Totale: ' + totalVolumes + ' albi';

      filterAllBtn.textContent = 'Tutti (' + totalCount + ')';
      filterMangaBtn.textContent = 'Manga (' + mangaCount + ')';
      filterComicBtn.textContent = 'Comics (' + comicCount + ')';
    }

    /* === 5. EVENTI CARD: DETTAGLI E INCREMENTO RAPIDO +1 === */
    // Aggiunge i click listener ai pulsanti 'Dettagli' e '+1 Vol'
    function attachCardEvents() {
      // Pulsanti 'Dettagli': aprono la modale con la trama dell'opera
      const detailButtons = document.querySelectorAll('.btn-card-details');
      detailButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
          const seriesId = Number(btn.getAttribute('data-id'));
          openDetailsModal(seriesId);
        });
      });

      // Pulsanti '+1 Vol': aumentano immediatamente il volume della serie
      const addVolButtons = document.querySelectorAll('.btn-card-add-vol');
      addVolButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
          const seriesId = Number(btn.getAttribute('data-id'));
          incrementSeriesVolume(seriesId);
        });
      });
    }

    /* === 6. INCREMENTO DEL VOLUME (+1) === */
    // Incrementa di 1 il numero del volume attuale e aggiorna l'interfaccia
    function incrementSeriesVolume(seriesId) {
      const series = seriesList.find(function(s) { return s.id === seriesId; });
      if (series) {
        series.currentVol += 1;
        series.footerText = 'Aggiornato adesso';
        renderSeries();
      }
    }

    /* === 7. GESTIONE DEI FILTRI (TUTTI, MANGA, COMICS) === */
    // Assegna il filtro e lo stile visivo attivo
    function setupFilters() {
      const filterButtons = [filterAllBtn, filterMangaBtn, filterComicBtn];

      filterButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
          // Rimuove la classe attiva da tutti i pulsanti
          filterButtons.forEach(function(b) { b.classList.remove('active'); });
          // Aggiunge la classe attiva a quello cliccato
          btn.classList.add('active');
          // Legge il valore del data-filter
          currentFilter = btn.getAttribute('data-filter');
          // Ridisegna la lista
          renderSeries();
        });
      });
    }

    /* === 8. GESTIONE DELLE MODALI === */
    // Apre una finestra modale generica
    function openModal(modalElement) {
      modalElement.classList.add('open');
    }

    // Chiude una finestra modale generica
    function closeModal(modalElement) {
      modalElement.classList.remove('open');
    }

    // Chiusura al click sullo sfondo oscurato
    document.querySelectorAll('.modal-overlay').forEach(function(overlay) {
      overlay.addEventListener('click', function(event) {
        if (event.target === overlay) {
          closeModal(overlay);
        }
      });
    });

    // --- MODALE DETTAGLI / TRAMA E MODIFICA STATO ---
    function openDetailsModal(seriesId) {
      currentDetailsSeriesId = seriesId;
      const series = seriesList.find(function(s) { return s.id === seriesId; });
      if (!series) return;

      detailsModalHeading.textContent = series.title;
      detailsCategoryBadge.textContent = series.type.toUpperCase() + (series.subCategory ? ' · ' + series.subCategory.toUpperCase() : '');
      detailsVolumeBadge.textContent = 'Volume attuale: Vol. ' + series.currentVol;
      detailsPlotContent.textContent = series.plot || "Nessuna trama disponibile per quest'opera.";

      // Imposta il valore iniziale nel menu a tendina dello stato
      if (['In corso', 'Mensile', 'Pausa', 'Allineato'].includes(series.statusText)) {
        detailsStatusSelect.value = series.statusText;
        detailsCustomStatusInput.style.display = 'none';
      } else if (series.statusText.includes('%')) {
        detailsStatusSelect.value = 'percent';
        detailsCustomStatusInput.style.display = 'none';
      } else {
        detailsStatusSelect.value = 'custom';
        detailsCustomStatusInput.value = series.statusText;
        detailsCustomStatusInput.style.display = 'block';
      }

      openModal(detailsModal);
    }

    // Mostra/nasconde il campo personalizzato se si sceglie "Altro"
    detailsStatusSelect.addEventListener('change', function() {
      if (detailsStatusSelect.value === 'custom') {
        detailsCustomStatusInput.style.display = 'block';
        detailsCustomStatusInput.focus();
      } else {
        detailsCustomStatusInput.style.display = 'none';
      }
    });

    // Salvataggio del nuovo stato della serie
    saveDetailsStatusBtn.addEventListener('click', function() {
      const series = seriesList.find(function(s) { return s.id === currentDetailsSeriesId; });
      if (!series) return;

      const selectedValue = detailsStatusSelect.value;
      if (selectedValue === 'In corso') {
        series.statusText = 'In corso';
        series.statusColor = 'status-green';
      } else if (selectedValue === 'Mensile') {
        series.statusText = 'Mensile';
        series.statusColor = 'status-violet';
      } else if (selectedValue === 'Pausa') {
        series.statusText = 'Pausa';
        series.statusColor = 'status-amber';
      } else if (selectedValue === 'Allineato') {
        series.statusText = 'Allineato';
        series.statusColor = 'status-green';
      } else if (selectedValue === 'percent') {
        const percent = Math.min(100, Math.round((series.currentVol / (series.totalVol || series.currentVol)) * 100));
        series.statusText = percent + '%';
        series.statusColor = 'status-cyan';
      } else if (selectedValue === 'custom') {
        series.statusText = detailsCustomStatusInput.value.trim() || 'In corso';
        series.statusColor = 'status-cyan';
      }

      series.footerText = 'Stato aggiornato';
      renderSeries();

      // Piccolo feedback visivo di successo sul pulsante
      saveDetailsStatusBtn.innerHTML = '<span class="material-symbols-rounded" style="font-size:16px;">done</span><span>Salvato!</span>';
      setTimeout(function() {
        saveDetailsStatusBtn.innerHTML = '<span class="material-symbols-rounded" style="font-size:16px;">check</span><span>Salva Stato</span>';
      }, 1200);
    });

    closeDetailsBtn.addEventListener('click', function() { closeModal(detailsModal); });
    closeDetailsBottomBtn.addEventListener('click', function() { closeModal(detailsModal); });

    // --- MODALE AGGIUNGI SERIE ---
    // Aggiorna dinamicamente le sottocategorie in base a Manga o Comics
    function updateSubcategories() {
      const selectedType = seriesCategorySelect.value;
      seriesSubcategorySelect.innerHTML = '';

      if (selectedType === 'manga') {
        seriesSubcategoryLabel.textContent = 'Target / Categoria';
        const mangaOptions = [
          { value: 'Shonen', text: 'Shōnen (Azione / Ragazzi)' },
          { value: 'Seinen', text: 'Seinen (Introspettivo / Adulti)' },
          { value: 'Shojo', text: 'Shōjo (Sentimentale / Ragazze)' },
          { value: 'Josei', text: 'Josei (Donne adulte)' },
          { value: 'Kodomo', text: 'Kodomo / Altro Manga' }
        ];
        mangaOptions.forEach(function(opt) {
          const el = document.createElement('option');
          el.value = opt.value;
          el.textContent = opt.text;
          seriesSubcategorySelect.appendChild(el);
        });
      } else {
        seriesSubcategoryLabel.textContent = 'Universo / Editore';
        const comicOptions = [
          { value: 'Marvel', text: 'Universo Marvel' },
          { value: 'DC', text: 'Universo DC Comics' },
          { value: 'Image', text: 'Image Comics' },
          { value: 'Bonelli', text: 'Sergio Bonelli Editore' },
          { value: 'Dark Horse', text: 'Dark Horse Comics' },
          { value: 'Indipendente', text: 'Indipendente / Altro' }
        ];
        comicOptions.forEach(function(opt) {
          const el = document.createElement('option');
          el.value = opt.value;
          el.textContent = opt.text;
          seriesSubcategorySelect.appendChild(el);
        });
      }
    }

    seriesCategorySelect.addEventListener('change', updateSubcategories);

    openAddSeriesBtn.addEventListener('click', function() { openModal(addSeriesModal); });
    summaryAddSeriesBtn.addEventListener('click', function() { openModal(addSeriesModal); });
    closeAddSeriesBtn.addEventListener('click', function() { closeModal(addSeriesModal); });

    // Salvataggio nuova serie dal form
    addSeriesForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Evita il ricaricamento della pagina

      const title = document.querySelector('#seriesTitleInput').value.trim();
      const type = seriesCategorySelect.value;
      const subCategory = seriesSubcategorySelect.value;
      const currentVol = parseInt(document.querySelector('#seriesCurrentVolInput').value, 10) || 1;
      const totalVol = parseInt(document.querySelector('#seriesTotalVolInput').value, 10) || currentVol;
      let statusText = document.querySelector('#seriesStatusInput').value.trim() || 'In corso';
      const coverTheme = seriesCoverThemeSelect.value;
      const plot = document.querySelector('#seriesPlotInput').value.trim();

      // Determinazione del colore del badge di stato
      let statusColor = 'status-green';
      if (statusText === 'Mensile') {
        statusColor = 'status-violet';
      } else if (statusText === 'Pausa') {
        statusColor = 'status-amber';
      } else if (statusText === 'Allineato') {
        statusColor = 'status-green';
      } else if (statusText === 'percent') {
        const percent = Math.min(100, Math.round((currentVol / totalVol) * 100));
        statusText = percent + '%';
        statusColor = 'status-cyan';
      }

      // Sigla automatica per la copertina (prime 3 lettere del titolo)
      const code = title.slice(0, 3).toUpperCase() + '-' + currentVol;

      // Creazione nuovo oggetto serie completo di sottocategoria
      const newSeries = {
        id: Date.now(), // ID univoco temporale
        title: title,
        type: type,
        subCategory: subCategory,
        code: code,
        icon: type === 'manga' ? 'auto_stories' : 'token',
        currentVol: currentVol,
        totalVol: totalVol,
        statusText: statusText,
        statusColor: statusColor,
        subDetailText: (subCategory ? subCategory + ' · ' : '') + 'Aggiunto di recente',
        footerText: 'Aggiornato adesso',
        coverTheme: coverTheme,
        plot: plot || "Trama non inserita."
      };

      // Aggiunge la serie all'inizio dell'elenco
      seriesList.unshift(newSeries);

      // Reset del form e chiusura
      addSeriesForm.reset();
      updateSubcategories();
      closeModal(addSeriesModal);

      // Aggiornamento grafico
      renderSeries();
    });

    // --- MODALE REGISTRA VOLUME (+ VOLUME) ---
    function populateSeriesDropdown() {
      selectSeriesDropdown.innerHTML = '';
      seriesList.forEach(function(s) {
        const option = document.createElement('option');
        option.value = s.id;
        option.textContent = s.title + ' (Attuale: Vol. ' + s.currentVol + ')';
        selectSeriesDropdown.appendChild(option);
      });
      updateVolumePreview();
    }

    function updateVolumePreview() {
      const selectedId = Number(selectSeriesDropdown.value);
      const series = seriesList.find(function(s) { return s.id === selectedId; });
      if (series) {
        volumePreviewBox.innerHTML = `
          <strong>${series.title}</strong> passerà dal 
          <span style="color:var(--coral-primary);">Vol. ${series.currentVol}</span> al 
          <strong style="color:var(--cyan-tech);">Vol. ${series.currentVol + 1}</strong>.
        `;
      } else {
        volumePreviewBox.textContent = 'Nessuna serie disponibile.';
      }
    }

    selectSeriesDropdown.addEventListener('change', updateVolumePreview);

    openAddVolumeBtn.addEventListener('click', function() {
      populateSeriesDropdown();
      openModal(addVolumeModal);
    });

    summaryAddVolumeBtn.addEventListener('click', function() {
      populateSeriesDropdown();
      openModal(addVolumeModal);
    });

    closeAddVolumeBtn.addEventListener('click', function() {
      closeModal(addVolumeModal);
    });

    // Conferma incremento dalla modale
    addVolumeForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const selectedId = Number(selectSeriesDropdown.value);
      if (selectedId) {
        incrementSeriesVolume(selectedId);
        closeModal(addVolumeModal);
      }
    });

    // --- MODALE ORDINA E FILTRA AVANZATO ---
    openSortFilterBtn.addEventListener('click', function() {
      sortBySelect.value = currentSort;
      filterStatusSelect.value = currentStatusFilter;
      filterSubcategorySelect.value = currentSubcategoryFilter;
      openModal(sortFilterModal);
    });

    closeSortFilterBtn.addEventListener('click', function() {
      closeModal(sortFilterModal);
    });

    // Applicazione criteri di ordinamento e filtro
    sortFilterForm.addEventListener('submit', function(event) {
      event.preventDefault();
      currentSort = sortBySelect.value;
      currentStatusFilter = filterStatusSelect.value;
      currentSubcategoryFilter = filterSubcategorySelect.value;
      closeModal(sortFilterModal);
      renderSeries();
    });

    // Reset ai valori predefiniti
    resetSortFilterBtn.addEventListener('click', function() {
      currentSort = 'default';
      currentStatusFilter = 'all';
      currentSubcategoryFilter = 'all';
      sortBySelect.value = 'default';
      filterStatusSelect.value = 'all';
      filterSubcategorySelect.value = 'all';
      closeModal(sortFilterModal);
      renderSeries();
    });

    /* === 9. AVVIO DELL'APPLICAZIONE === */
    // Configura i filtri e renderizza la schermata iniziale al caricamento
    setupFilters();
    updateSubcategories();
    renderSeries();
