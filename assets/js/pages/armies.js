import { onReady } from '../utils/dom-ready.js';
import { escapeHtml } from '../utils/escape-html.js';
import { buildCardSkeleton } from '../utils/skeleton.js';

const API_URL = 'https://kurd-coc-apiproxy.bilalmhasan855.workers.dev/api/trending-armies?days=7&limit=20';

onReady(loadArmies);

async function loadArmies() {
    const grid = document.getElementById('armyGrid');
    if (!grid) return;

    grid.innerHTML = buildCardSkeleton(6);

    try {
        const res = await fetch(API_URL);
        const data = await res.json();
        renderArmies(grid, data.results || []);
    } catch {
        grid.innerHTML = '<p class="army-grid__loading">هەڵەیەک ڕوویدا لە هێنانی زانیارییەکان</p>';
    }
}

const IMAGE_MAPPING = {
    "Earthquake_Boots": "imgi_100_Earthquake_Boots.png",
    "Fireball": "imgi_101_Fireball.png",
    "barbarian": "imgi_103_barbarian.jpg",
    "ice_hound": "imgi_105_ice_hound.jpg",
    "meteor_golem": "imgi_108_meteor_golem.jpg",
    "goblin": "imgi_109_goblin.jpg",
    "ice_golem": "imgi_10_ice_golem.jpg",
    "thrower": "imgi_111_thrower.jpg",
    "furnace": "imgi_112_furnace.jpg",
    "Life_Gem": "imgi_113_Life_Gem.png",
    "super_witch": "imgi_115_super_witch.jpg",
    "wizard": "imgi_116_wizard.jpg",
    "super_wallbreaker": "imgi_11_super_wallbreaker.jpg",
    "head_hunter": "imgi_12_head_hunter.jpg",
    "baby_dragon": "imgi_13_baby_dragon.jpg",
    "archer": "imgi_14_archer.jpg",
    "Invisibility_Spell": "imgi_15_Invisibility_Spell.png",
    "revive_spell": "imgi_16_revive_spell.png",
    "totem_spell": "imgi_17_totem_spell.png",
    "Poison_Spell": "imgi_18_Poison_Spell.png",
    "siege_machine_sky_wagon": "imgi_19_siege machine sky wagon.webp",
    "Log_Launcher": "imgi_20_Log_Launcher.png",
    "root_rider": "imgi_21_root_rider.jpg",
    "Rage_Spell": "imgi_22_Rage_Spell.png",
    "Barbarian_King": "imgi_23_Barbarian_King.png",
    "Frosty": "imgi_24_Frosty.png",
    "spiky_ball": "imgi_25_spiky_ball.png",
    "snake_bracelet": "imgi_26_snake_bracelet.png",
    "Archer_Queen": "imgi_27_Archer_Queen.png",
    "sneezy": "imgi_28_sneezy.png",
    "magic_mirror": "imgi_29_magic_mirror.png",
    "action_figure": "imgi_30_action_figure.png",
    "Grand_Warden": "imgi_31_Grand_Warden.png",
    "Poison_Lizard": "imgi_32_Poison_Lizard.png",
    "heroic_torch": "imgi_33_heroic_torch.png",
    "Eternal_Tome": "imgi_34_Eternal_Tome.png",
    "dragon_duke": "imgi_35_dragon_duke.png",
    "Spirit_Fox": "imgi_36_Spirit_Fox.png",
    "fire_heart": "imgi_37_fire_heart.png",
    "electro_fangs": "imgi_38_electro_fangs.webp",
    "troops_launcher": "imgi_3_troops_launcher.png",
    "Flame_Flinger": "imgi_40_Flame_Flinger.png",
    "dragon_rider": "imgi_41_dragon_rider.jpg",
    "dragon": "imgi_42_dragon.jpg",
    "lava_hound": "imgi_43_lava_hound.jpg",
    "rocket_balloon": "imgi_44_rocket_balloon.jpg",
    "inferno_dragon": "imgi_45_inferno_dragon.jpg",
    "minion": "imgi_46_minion.jpg",
    "Earthquake_Spell": "imgi_47_Earthquake_Spell.png",
    "Freeze_Spell": "imgi_48_Freeze_Spell.png",
    "Overgrowth_Spell": "imgi_49_Overgrowth_Spell.png",
    "super_bowler": "imgi_4_super_bowler.jpg",
    "Skeleton_Spell": "imgi_50_Skeleton_Spell.png",
    "Angry_Jelly": "imgi_51_Angry_Jelly.png",
    "rocket_backpacks": "imgi_52_rocket_backpacks.webp",
    "Giant_Arrow": "imgi_53_Giant_Arrow.png",
    "Healing_Tome": "imgi_54_Healing_Tome.png",
    "minion_prince": "imgi_55_minion_prince.png",
    "mighty_raven": "imgi_56_mighty_raven.png",
    "dark_orb": "imgi_57_dark_orb.png",
    "meteor_staff": "imgi_58_meteor_staff.png",
    "healer": "imgi_5_healer.jpg",
    "Phoenix": "imgi_60_Phoenix.png",
    "Unicorn": "imgi_61_Unicorn.png",
    "flame_blower": "imgi_62_flame_blower.png",
    "electro_titan": "imgi_64_electro_titan.jpg",
    "valkyrie": "imgi_65_valkyrie.jpg",
    "super_barbar": "imgi_67_super_barbar.jpg",
    "wall_breaker": "imgi_68_wall_breaker.jpg",
    "super_yeti": "imgi_69_super_yeti.jpg",
    "app_warden": "imgi_6_app_warden.jpg",
    "super_valkyrie": "imgi_70_super_valkyrie.jpg",
    "Recall_Spell": "imgi_71_Recall_Spell.png",
    "stun_blaster": "imgi_72_stun_blaster.png",
    "Diggy": "imgi_73_Diggy.png",
    "Rage_Gem": "imgi_74_Rage_Gem.png",
    "Royal_Champion": "imgi_75_Royal_Champion.png",
    "rocket_spear": "imgi_76_rocket_spear.png",
    "electro_boots": "imgi_77_electro_boots.png",
    "Giant_Gauntlet": "imgi_79_Giant_Gauntlet.png",
    "balloon": "imgi_7_balloon.jpg",
    "stick_horse": "imgi_80_stick_horse.png",
    "dark_crown": "imgi_82_dark_crown.png",
    "super_dragon": "imgi_84_super_dragon.jpg",
    "Stone_Slammer": "imgi_87_Stone_Slammer.png",
    "Seeking_Shield": "imgi_88_Seeking_Shield.png",
    "Battle_Drill": "imgi_8_Battle_Drill.png",
    "witch": "imgi_90_witch.jpg",
    "electro_dragon": "imgi_92_electro_dragon.jpg",
    "super_minion": "imgi_93_super_minion.jpg",
    "druid": "imgi_96_druid.jpg",
    "hog_rider": "imgi_97_hog_rider.jpg",
    "ice_block_spell": "imgi_98_ice_block_spell.png",
    "yeti": "imgi_99_yeti.jpg",
    "Siege_Barracks": "imgi_9_Siege_Barracks.png"
};

function renderImageHtml(iconPath, name, className) {
    const svgUrl = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='none'><circle cx='50' cy='50' r='45' stroke='%23fb923c' stroke-width='3' fill='%230b1528'/><text x='50%' y='65%' dominant-baseline='middle' text-anchor='middle' font-size='40' fill='%23fb923c' font-weight='bold'>?</text></svg>";
    
    if (!iconPath) {
        let fallbackSrc = svgUrl;
        if (name) {
            const lowerName = name.toLowerCase();
            if (lowerName.includes('equipment 19') || lowerName.includes('healing tome')) {
                fallbackSrc = 'image_of_common_attack/imgi_54_Healing_Tome.png';
            }
        }
        return `<img src="${fallbackSrc}" alt="${escapeHtml(name)}" class="${className}" loading="lazy">`;
    }
    
    // Extract base name from path, e.g. "/static/troops/super_bowler.jpg" -> "super_bowler"
    let baseName = iconPath.split('/').pop().split('.').slice(0, -1).join('.');
    
    // Map to prefix-based filename
    const mappedFile = IMAGE_MAPPING[baseName];
    const localUrl = mappedFile ? `image_of_common_attack/${mappedFile}` : `image_of_common_attack/${baseName}.webp`;
    const remoteUrl = iconPath.startsWith('http') ? iconPath : `https://clashfox.com${iconPath}`;
    
    return `<img src="${localUrl}" onerror="this.onerror=function(){this.onerror=null;this.src='${svgUrl}'}; this.src='${remoteUrl}';" alt="${escapeHtml(name)}" class="${className}" loading="lazy">`;
}

function renderUnitIcons(units) {
    if (!units || !units.length) return `<p class="army-section__empty">بەتالی</p>`;
    return units.map(unit => {
        const countBadge = unit.amount > 1 ? `<span class="unit-icon__badge">x${unit.amount}</span>` : '';
        const imgHtml = renderImageHtml(unit.icon, unit.name, 'unit-icon__img');
        return `
            <div class="unit-icon" title="${escapeHtml(unit.name)} (x${unit.amount})">
                ${imgHtml}
                ${countBadge}
            </div>
        `;
    }).join('');
}

function renderHeroes(heroes) {
    if (!heroes || !heroes.length) return `<p class="army-section__empty">بەتالی</p>`;
    return heroes.map(hero => {
        const heroImgHtml = renderImageHtml(hero.icon, hero.name, 'hero-card__hero-img');
        
        let petHtml = '';
        if (hero.pet && hero.pet.name) {
            const petImgHtml = renderImageHtml(hero.pet.icon, hero.pet.name, 'hero-card__pet-img');
            petHtml = `
                <div class="hero-card__pet" title="${escapeHtml(hero.pet.name)}">
                    ${petImgHtml}
                </div>
            `;
        }
        
        let equipmentHtml = '';
        if (hero.equipment && hero.equipment.length) {
            equipmentHtml = hero.equipment.map(eq => {
                if (!eq.name && !eq.icon) return '';
                const eqImgHtml = renderImageHtml(eq.icon, eq.name, 'hero-card__eq-img');
                return `
                    <div class="hero-card__eq" title="${escapeHtml(eq.name || 'کەرەستە')}">
                        ${eqImgHtml}
                    </div>
                `;
            }).join('');
        }

        const petSubtitle = hero.pet && hero.pet.name ? `Pet: ${escapeHtml(hero.pet.name)}` : 'No Pet';

        return `
            <div class="hero-card">
                <div class="hero-card__main">
                    <div class="hero-card__hero" title="${escapeHtml(hero.name)}">
                        ${heroImgHtml}
                    </div>
                    <div class="hero-card__info">
                        <h4 class="hero-card__name">${escapeHtml(hero.name)}</h4>
                        <p class="hero-card__subtitle">${petSubtitle}</p>
                    </div>
                    ${petHtml}
                </div>
                <div class="hero-card__equipments">
                    ${equipmentHtml}
                </div>
            </div>
        `;
    }).join('');
}

function getTownHallLevel(army) {
    // 1. Check if Dragon Duke exists in heroes (TH18 exclusive)
    const hasDragonDuke = army.heroes && army.heroes.some(h => h.name && h.name.toLowerCase().includes('dragon duke'));
    if (hasDragonDuke) return 18;

    // 2. Check troop space (totals.troop_space)
    const space = army.totals && army.totals.troop_space;
    if (space) {
        if (space >= 350) return 18;
        if (space >= 330) return 17;
        if (space >= 310) return 16;
    }
    
    // 3. Fallback signature/string analysis
    const checkString = JSON.stringify(army).toLowerCase();
    if (checkString.includes('th18') || checkString.includes('town hall 18') || checkString.includes('townhall 18')) return 18;
    if (checkString.includes('th17') || checkString.includes('town hall 17') || checkString.includes('townhall 17')) return 17;
    if (checkString.includes('th16') || checkString.includes('town hall 16') || checkString.includes('townhall 16')) return 16;

    return 18; // Default fallback to max trending TH level
}

function renderArmies(grid, armies) {
    if (!armies.length) {
        grid.innerHTML = '<p class="army-grid__loading">هیچ سوپایەک نەدۆزرایەوە</p>';
        return;
    }

    grid.className = 'army-grid stagger-children';
    grid.innerHTML = armies.map((army, index) => {
        // Filter army units based on role
        const coreUnits = (army.army_units || []).filter(u => u.role === 'core' || u.role === 'strategy_lock');
        const supportUnits = (army.army_units || []).filter(u => u.role === 'support');
        
        const coreHtml = renderUnitIcons(coreUnits);
        const supportHtml = renderUnitIcons(supportUnits);
        const spellsHtml = renderUnitIcons(army.spells || []);
        
        // CC contains both units and spells
        const ccItems = [...(army.clan_castle_units || []), ...(army.clan_castle_spells || [])];
        const ccHtml = renderUnitIcons(ccItems);
        
        const heroesHtml = renderHeroes(army.heroes || []);
        const thLevel = getTownHallLevel(army);

        const videoUrl = (army.variants || []).find(v => v.video_url)?.video_url || '';
        const videoButtonHtml = videoUrl ? `
            <a href="${escapeHtml(videoUrl)}" target="_blank" rel="noopener noreferrer" class="btn army-card__video" title="سەیرکردنی ڤیدیۆی ئەتاک لە یوتیوب">
                <span>ڤیدیۆ</span>
                <svg class="icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.507 9.388.507 9.388.507s7.517 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
        ` : '';

        return `
            <article class="army-card">
                <div class="army-card__header">
                    <div class="army-card__meta">
                        <div class="army-card__title-row">
                            <span class="army-card__rank">#${index + 1}</span>
                            <span class="th-badge th-badge--${thLevel}">TH ${thLevel}</span>
                        </div>
                        <h2 class="army-card__name">${escapeHtml(army.name || 'سوپای بێ ناو')}</h2>
                        <div class="army-card__stats">
                            <span class="stat-badge" title="سەیرکردن (Seen count)">
                                <svg class="icon" viewBox="0 0 24 24" width="16" height="16"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor"/></svg>
                                <span>${escapeHtml(army.seen_count || 0)}</span>
                            </span>
                            <span class="stat-badge" title="نمرە (Score)">
                                <svg class="icon" viewBox="0 0 24 24" width="16" height="16"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="currentColor"/></svg>
                                <span>${escapeHtml(army.score || 0)}</span>
                            </span>
                        </div>
                    </div>
                    <div class="army-card__actions">
                        ${videoButtonHtml}
                        <a href="${escapeHtml(army.source_link || '#')}" target="_blank" rel="noopener noreferrer" class="btn btn--cta army-card__copy">
                            <span>کۆپی بکە</span>
                            <svg class="icon" viewBox="0 0 24 24" width="18" height="18"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" fill="currentColor"/></svg>
                        </a>
                    </div>
                </div>

                <div class="army-card__content">
                    <div class="army-section">
                        <h3 class="army-section__title">CORE ARMY</h3>
                        <div class="army-section__row">
                            ${coreHtml}
                        </div>
                    </div>

                    <div class="army-section">
                        <h3 class="army-section__title">SUPPORT UNITS</h3>
                        <div class="army-section__row">
                            ${supportHtml}
                        </div>
                    </div>

                    <div class="army-section">
                        <h3 class="army-section__title">SPELLS</h3>
                        <div class="army-section__row">
                            ${spellsHtml}
                        </div>
                    </div>

                    <div class="army-section">
                        <h3 class="army-section__title">CLAN CASTLE</h3>
                        <div class="army-section__row">
                            ${ccHtml}
                        </div>
                    </div>

                    <div class="army-section">
                        <h3 class="army-section__title">HEROES / PETS / EQUIPMENT</h3>
                        <div class="heroes-grid">
                            ${heroesHtml}
                        </div>
                    </div>
                </div>
            </article>
        `;
    }).join('');

    requestAnimationFrame(() => grid.classList.add('is-visible'));
}
