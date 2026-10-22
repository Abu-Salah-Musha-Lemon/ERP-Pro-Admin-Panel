/* Copyright 2026 Abu Salah Musha Lemon. SPDX-License-Identifier: Apache-2.0 */
/* ERP Pro — Vanilla JS behavior, Bootstrap 5, DataTables & ApexCharts.
   This is a client-only demonstrator. Do not treat localStorage as secure storage. */
(function () {
  'use strict';
  const SEED=window.ERP_SEED||{};
  const chartInstances=[];
  const PREFIX='erpProDemoV2:';
  const $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const money=v=>'$'+Number(v||0).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
  const number=v=>Number(String(v||0).replace(/[$,%\s]/g,'').replace(/,/g,''))||0;
  const storage={get(key){try{return localStorage.getItem(PREFIX+key)}catch(e){return null}},set(key,v){try{localStorage.setItem(PREFIX+key,v);return true}catch(e){notify('Local storage is unavailable. Changes may not persist.','warning');return false}},json(key){try{return JSON.parse(this.get(key)||'null')}catch(e){return null}}};
  function records(entity){
    const stored=storage.json('records:'+entity);const original=Array.isArray(stored)?stored:(SEED[entity]||[]);
    return original.map((r,i)=>Object.assign({_id:entity+'-'+i},r));
  }
  function save(entity,data){storage.set('records:'+entity,JSON.stringify(data));}
  function notify(msg,type='success',title='ERP Pro'){
    if(window.toastr&&!window.toastr.__erpFallback&&typeof window.toastr[type]==='function'){window.toastr[type](msg,title);return;}
    let holder=$('#fallback-toast');if(!holder){holder=document.createElement('div');holder.id='fallback-toast';holder.setAttribute('role','status');holder.style.cssText='position:fixed;right:15px;bottom:15px;z-index:4000;max-width:340px';document.body.append(holder)}
    const n=document.createElement('div');n.textContent=title+': '+msg;n.style.cssText='padding:12px 18px;margin-top:8px;color:#fff;background:#1b2850;border-radius:8px;box-shadow:0 8px 20px #0003';holder.append(n);setTimeout(()=>n.remove(),3700);
  }
  function confirmAction(title,text){
    return window.Swal?Swal.fire({title,text,icon:'warning',showCancelButton:true,confirmButtonColor:'#ea5455',cancelButtonColor:'#637381',confirmButtonText:'Confirm'}).then(r=>r.isConfirmed):Promise.resolve(window.confirm(title+'\n'+text));
  }
  function badge(value){let b=String(value||''),cl='badge-'+b.toLowerCase().replace(/[^a-z]+/g,'-').replace(/^-|-$/g,'');return '<span class="status-badge '+esc(cl)+'">'+esc(b)+'</span>'}
  function iconForProduct(n){n=String(n).toLowerCase();if(/macbook|dell/.test(n))return '💻';if(n.includes('tv'))return '📺';if(/airpods|sony/.test(n))return '🎧';if(n.includes('jeans'))return '👖';if(n.includes('nike'))return '👟';if(n.includes('chair'))return '🪑';return '📱'}
  function cell(row,key,entity){const v=row[key]??'';
    if(key==='status'||key==='stage')return badge(v);
    if(key==='name'&&entity==='products')return '<span class="item-cell"><span class="item-thumb">'+iconForProduct(v)+'</span><span><strong>'+esc(v)+'</strong><small>'+esc(row.sku)+'</small></span></span>';
    if(key==='name'&&['customers','employees','users'].includes(entity))return '<span class="item-cell"><span class="avatar-initial">'+esc(String(v).split(' ').slice(0,2).map(x=>x[0]).join('').toUpperCase())+'</span><strong>'+esc(v)+'</strong></span>';
    return esc(v);
  }
  const buttons='<div class="action-btns"><button type="button" class="action-btn btn-view" title="View record" aria-label="View record"><i class="bi bi-eye"></i></button><button type="button" class="action-btn btn-edit" title="Edit record" aria-label="Edit record"><i class="bi bi-pencil-square"></i></button><button type="button" class="action-btn btn-delete confirm-delete" title="Delete record" aria-label="Delete record"><i class="bi bi-trash3"></i></button></div>';
  function hasDataTables(){return !!(window.jQuery&&jQuery.fn&&jQuery.fn.DataTable)}
  function dataTable(el){return hasDataTables()&&jQuery.fn.DataTable.isDataTable(el)?jQuery(el).DataTable():null}
  function drawTable(el){
    const entity=el.dataset.entity,cols=el.dataset.cols.split(',');const dt=dataTable(el);
    if(dt)dt.destroy();
    const list=records(entity);
    el.querySelector('tbody').innerHTML=list.map(r=>'<tr data-id="'+esc(r._id)+'"><td><input class="form-check-input row-cb" type="checkbox" aria-label="Select row"></td>'+cols.map(k=>'<td>'+cell(r,k,entity)+'</td>').join('')+'<td>'+buttons+'</td></tr>').join('');
    const select=el.querySelector('.select-all-cb');if(select){select.checked=false;select.indeterminate=false;}
    const bar=el.closest('.card-body')?.querySelector('.bulk-bar');if(bar)bar.classList.add('d-none');
    if(hasDataTables())initDataTable(el);else applyFallbackSearch(el);
  }
  function initDataTable(el){
    const wrap=el.closest('.card-body');const toolbar=wrap?.querySelector('.dt-btn-wrap');if(!toolbar)return;
    toolbar.innerHTML='';
    const hasButtons=!!(jQuery.fn.dataTable.Buttons);
    const opts={paging:true,pageLength:10,lengthMenu:[[10,25,50,100,-1],[10,25,50,100,'All']],searching:true,ordering:true,orderMulti:true,orderCellsTop:true,info:true,responsive:!!jQuery.fn.dataTable.Responsive,scrollX:true,stateSave:true,processing:false,columnDefs:[{orderable:false,targets:[0,-1]},{searchable:false,targets:[0,-1]}],dom:"<'d-none'f>"+"<'row'<'col-12'tr>>"+"<'row mt-3 align-items-center'<'col-sm-5'i><'col-sm-4'l><'col-sm-3'p>>",language:{emptyTable:'No records yet',zeroRecords:'No matching records found',info:'Showing _START_–_END_ of _TOTAL_',lengthMenu:'Show _MENU_',paginate:{previous:'‹',next:'›'}}};
    if(hasButtons){opts.buttons=[{extend:'colvis',text:'Columns',className:'btn btn-sm btn-outline-secondary'},{extend:'excelHtml5',text:'Excel',className:'btn btn-sm btn-outline-success',exportOptions:{columns:':visible:not(:first-child):not(:last-child)'}},{extend:'csvHtml5',text:'CSV',className:'btn btn-sm btn-outline-info',exportOptions:{columns:':visible:not(:first-child):not(:last-child)'}},{extend:'pdfHtml5',text:'PDF',className:'btn btn-sm btn-outline-danger',exportOptions:{columns:':visible:not(:first-child):not(:last-child)'}},{extend:'print',text:'Print',className:'btn btn-sm btn-outline-secondary',exportOptions:{columns:':visible:not(:first-child):not(:last-child)'}},{extend:'copyHtml5',text:'Copy',className:'btn btn-sm btn-outline-secondary',exportOptions:{columns:':visible:not(:first-child):not(:last-child)'}}];}
    try{
      const dt=jQuery(el).DataTable(opts);
      if(hasButtons)dt.buttons().container().appendTo(toolbar);
      const search=wrap.querySelector('.dt-custom-search');if(search){search.value=dt.search();search.oninput=()=>dt.search(search.value).draw();}
      el.querySelectorAll('.col-filter-row th').forEach((th,i)=>{const inp=th.querySelector('input,select');if(inp){inp.oninput=()=>dt.column(i).search(inp.value).draw();inp.onchange=inp.oninput;}});
      const filter=wrap.querySelector('.filter-status');if(filter){filter.onchange=()=>{const status=el.dataset.cols.split(',').indexOf('status');if(status>=0)dt.column(status+1).search(filter.value).draw();else dt.search(filter.value).draw();};}
      // Delegated checkbox click works when rows have been moved by DataTables.
    }catch(err){console.warn('DataTables fallback:',err);applyFallbackSearch(el)}
  }
  function applyFallbackSearch(el){
    const wrap=el.closest('.card-body'),search=wrap?.querySelector('.dt-custom-search'),filters=el.querySelectorAll('.col-filter-row input');const statusFilter=wrap?.querySelector('.filter-status');
    function apply(){const q=(search?.value||'').toLowerCase(),cols=Array.from(filters).map(f=>f.value.toLowerCase());
      el.querySelectorAll('tbody tr').forEach(tr=>{const cells=tr.querySelectorAll('td');const whole=tr.textContent.toLowerCase();let show=whole.includes(q)&&cols.every((s,i)=>!s||(cells[i+1]?.textContent.toLowerCase().includes(s)));if(statusFilter?.value)show=show&&whole.toLowerCase().includes(statusFilter.value.toLowerCase());tr.hidden=!show;});}
    if(search)search.oninput=apply;filters.forEach(f=>f.oninput=apply);if(statusFilter)statusFilter.onchange=apply;
  }
  function updateStats(entity){const stats=$('[data-stats-entity="'+entity+'"]');if(!stats)return;const vals=stats.querySelectorAll('.stat-value');const data=records(entity);if(vals[0])vals[0].textContent=data.length.toLocaleString();if(vals[1])vals[1].textContent=data.filter(r=>['Active','Paid','Completed'].includes(r.status)).length.toLocaleString();}
  function drawAll(entity){updateStats(entity);$$('table[data-entity="'+entity+'"]').forEach(drawTable);}
  function csvExport(entity,ids){const rows=records(entity).filter(r=>!ids||ids.includes(r._id));if(!rows.length){notify('No records to export.','warning');return;}
    const table=$('table[data-entity="'+entity+'"]'),cols=table?table.dataset.cols.split(','):Object.keys(rows[0]).filter(k=>k!=='_id');
    const csv=[cols.map(c=>c.replaceAll('_',' ')).join(','),...rows.map(r=>cols.map(c=>{let v=String(r[c]??'');if(/^[\s]*[=+@-]/.test(v))v="'"+v;return '"'+v.replaceAll('"','""')+'"';}).join(','))].join('\r\n');
    const a=document.createElement('a');const url=URL.createObjectURL(new Blob(['\uFEFF',csv],{type:'text/csv;charset=utf-8;'}));a.href=url;a.download=entity+'-export.csv';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);notify('CSV export ready.');}
  const modalState={entity:'',id:null,view:false};
  const OPTIONS={status:['Active','Inactive','Paid','Pending','Completed','Overdue','Draft','Low','Out of Stock'],stage:['Prospecting','Qualified','Proposal','Negotiation','Closed Won'],method:['Cash','Card','Bank'],category:['Electronics','Clothing','Footwear','Furniture','Accessories'],role:['Administrator','Manager','Cashier','Staff','Accountant','Warehouse','HR']};
  function editableCols(entity){const el=$('table[data-entity="'+entity+'"]');return el?el.dataset.cols.split(','):Object.keys((records(entity)[0]||{})).filter(k=>k!=='_id')}
  function formInput(key,val){let type=/email/i.test(key)?'email':/phone/.test(key)?'tel':/stock|quantity|capacity|products|orders|rate|decimal/.test(key)?'number':'text';
    let id='edit-'+key,field='',opts=OPTIONS[key];const placeholder=key.replaceAll('_',' ');
    if(['name','description','event','address'].includes(key))type='text';
    if(opts){let items=[...new Set([...opts,String(val||'')])].filter(Boolean);field='<select class="form-select" id="'+id+'" name="'+esc(key)+'">'+items.map(x=>'<option value="'+esc(x)+'"'+(x===val?' selected':'')+'>'+esc(x)+'</option>').join('')+'</select>';}
    else field='<input class="form-control" id="'+id+'" name="'+esc(key)+'" type="'+type+'" value="'+esc(val)+'" placeholder="Enter '+esc(placeholder)+'" '+(['name','sku','invoice','code','email'].includes(key)?'required':'')+'>';
    return '<div class="col-md-6"><label class="form-label" for="'+id+'">'+esc(placeholder.charAt(0).toUpperCase()+placeholder.slice(1))+'</label>'+field+'</div>';
  }
  function openModal(entity,id=null,view=false){
    const popup=$('#record-modal');if(!popup){notify('Record editor is unavailable.','error');return;}
    if(!window.bootstrap?.Modal){notify('Bootstrap did not load. Cannot open editor.','error');return;}
    modalState.entity=entity;modalState.id=id;modalState.view=view;
    const item=id?records(entity).find(r=>r._id===id):{};if(!item&&id){notify('Record not found.','error');return;}
    $('#record-modal-title').textContent=(view?'Record details':id?'Edit record':'Add record')+' · '+entity;
    const fields=$('#record-fields'),cols=editableCols(entity);
    fields.innerHTML=cols.map(k=>formInput(k,item?.[k]||'')).join('');
    fields.querySelectorAll('input,select').forEach(input=>{input.disabled=view});
    const saveBtn=$('#record-form button[type=submit]');saveBtn.classList.toggle('d-none',view);
    bootstrap.Modal.getOrCreateInstance(popup).show();
  }
  function validatedForm(form){if(!form.checkValidity()){form.reportValidity();notify('Please correct required or invalid fields.','error','Validation');return false;}return true;}
  function formValues(form){return Object.fromEntries(new FormData(form).entries());}
  function validAmounts(row){for(const k of ['price','total','paid','stock','quantity'])if(k in row&&number(row[k])<0){notify(k+' cannot be negative.','error');return false;}if(row.paid!==undefined&&row.total!==undefined&&number(row.paid)>number(row.total)){notify('Paid amount cannot exceed total.','error');return false;}return true;}
  function normalizeRow(row){for(const key of ['price','total','paid','amount','due'])if(key in row)row[key]=money(number(row[key]));if('stock' in row)row.stock=String(Math.floor(number(row.stock)));if('quantity' in row)row.quantity=String(Math.floor(number(row.quantity)));return row;}
  function onTableClick(e){
    const tr=e.target.closest('tr[data-id]');const table=e.target.closest('table[data-entity]');const action=e.target.closest('.btn-view,.btn-edit,.confirm-delete');
    if(!tr||!table||!action)return;
    const entity=table.dataset.entity,id=tr.dataset.id;
    if(action.matches('.btn-view')){openModal(entity,id,true)}
    else if(action.matches('.btn-edit')){openModal(entity,id,false)}
    else if(action.matches('.confirm-delete')){confirmAction('Delete this record?','This removes it from your local demo records.').then(ok=>{if(!ok){notify('Delete cancelled.','info');return;}save(entity,records(entity).filter(r=>r._id!==id));drawAll(entity);notify('Record deleted.');});}
  }
  function currentSelected(table){return Array.from(table.querySelectorAll('tbody .row-cb:checked')).map(cb=>cb.closest('tr')?.dataset.id).filter(Boolean)}
  function parseCSV(text){const rows=[];let row=[],v='',quoted=false;for(let i=0;i<text.length;i++){const c=text[i];if(c==='"'){if(quoted&&text[i+1]==='"'){v+='"';i++;}else quoted=!quoted;}else if(c===','&&!quoted){row.push(v);v='';}else if((c==='\n'||c==='\r')&&!quoted){if(c==='\r'&&text[i+1]==='\n')i++;row.push(v);if(row.some(x=>x.length))rows.push(row);row=[];v='';}else v+=c;}if(quoted)throw Error('Unclosed quote');row.push(v);if(row.some(x=>x.length))rows.push(row);if(!rows.length)throw Error('Empty CSV');return rows;}
  function updateBulk(table){const body=table.closest('.card-body'),bar=body?.querySelector('.bulk-bar');if(!bar)return;const selected=currentSelected(table);bar.classList.toggle('d-none',selected.length===0);bar.querySelector('.bulk-count').textContent=selected.length+' selected';const all=Array.from(table.querySelectorAll('tbody .row-cb'));const master=table.querySelector('.select-all-cb');if(master){master.checked=all.length>0&&selected.length===all.length;master.indeterminate=selected.length>0&&selected.length<all.length;}}
  function initTables(){$$('.datatable[data-entity]').forEach(drawTable);$$('[data-stats-entity]').forEach(x=>updateStats(x.dataset.statsEntity));}
  const MOBILE_BREAKPOINT=992;
  function initShell(){
    const sidebar=$('#sidebar'),body=document.body,overlay=$('#sidebar-overlay');
    const desktopToggle=$('#toggle-sidebar'),mobileToggle=$('#mobile-menu-btn'),mobileClose=$('#close-sidebar');
    const mobile=()=>window.innerWidth<MOBILE_BREAKPOINT;
    const setMini=(mini,persist=true)=>{
      body.classList.toggle('mini-sidebar',mini);
      desktopToggle?.setAttribute('aria-expanded',String(!mini));
      desktopToggle?.setAttribute('aria-label',mini?'Expand sidebar':'Collapse sidebar');
      desktopToggle?.setAttribute('title',mini?'Expand sidebar':'Collapse sidebar');
      if(persist)storage.set('sidebarMini',String(mini));
      const pref=$('#pref-mini');if(pref)pref.checked=mini;
    };
    setMini(storage.get('sidebarMini')==='true',false);
    const setMobileOpen=open=>{
      const visible=!!open&&mobile();
      body.classList.toggle('sidebar-open',visible);
      overlay?.classList.toggle('active',visible);
      mobileToggle?.setAttribute('aria-expanded',String(visible));
      mobileToggle?.setAttribute('aria-label',visible?'Close navigation menu':'Open navigation menu');
      if(sidebar){
        // Remove off-canvas links from the mobile keyboard tab order.
        sidebar.inert=mobile()&&!visible;
        sidebar.setAttribute('aria-hidden',String(mobile()&&!visible));
      }
      if(overlay)overlay.setAttribute('aria-hidden',String(!visible));
      if(!visible&&mobile()&&sidebar?.contains(document.activeElement))mobileToggle?.focus();
    };
    desktopToggle?.addEventListener('click',()=>setMini(!body.classList.contains('mini-sidebar')));
    mobileToggle?.addEventListener('click',()=>setMobileOpen(!body.classList.contains('sidebar-open')));
    mobileClose?.addEventListener('click',()=>{setMobileOpen(false);mobileToggle?.focus();});
    overlay?.addEventListener('click',()=>setMobileOpen(false));
    document.addEventListener('keydown',e=>{
      if(e.key==='Escape'&&body.classList.contains('sidebar-open'))setMobileOpen(false);
      if(e.key==='/'&&!/input|textarea|select/i.test(document.activeElement?.tagName||'')&&!e.ctrlKey&&!e.metaKey){e.preventDefault();$('#global-search')?.focus();}
    });
    document.addEventListener('click',e=>{
      if(mobile()&&body.classList.contains('sidebar-open')&&e.target.closest('#sidebar a[href$=".html"]'))setMobileOpen(false);
    });
    let wasMobile=mobile();
    window.addEventListener('resize',()=>{const isMobile=mobile();if(isMobile!==wasMobile){wasMobile=isMobile;setMobileOpen(false);}else if(!isMobile&&body.classList.contains('sidebar-open'))setMobileOpen(false);});
    sidebar?.querySelectorAll('.submenu>a').forEach(a=>{
      a.setAttribute('role','button');
      a.addEventListener('click',e=>{
        e.preventDefault();const li=a.parentElement,open=li.classList.contains('open');
        sidebar.querySelectorAll('.submenu.open').forEach(x=>{if(x!==li){x.classList.remove('open');x.querySelector(':scope>a')?.setAttribute('aria-expanded','false');}});
        li.classList.toggle('open',!open);a.setAttribute('aria-expanded',String(!open));
      });
      a.addEventListener('keydown',e=>{if(e.key===' '){e.preventDefault();a.click();}});
    });
    const path=location.pathname.split('/').pop()||'index.html';
    sidebar?.querySelectorAll('a[href]').forEach(a=>{
      const href=a.getAttribute('href').split('#')[0];
      if(href===path){a.classList.add('active');a.setAttribute('aria-current','page');
        const parent=a.closest('.submenu');if(parent){parent.classList.add('open');parent.querySelector(':scope>a')?.setAttribute('aria-expanded','true');}}
    });
    setMobileOpen(false);
    initGlobalSearch();initNotifications();
    $$('.lang-dropdown .dropdown-item').forEach(a=>a.addEventListener('click',e=>{
      e.preventDefault();notify(a.dataset.lang==='EN'?'English is the current interface language.':'Translation packs are not installed in this demo.','info','Language');
    }));
  }
  function applyTheme(on,toast=true){
    const root=document.documentElement;
    root.setAttribute('data-bs-theme',on?'dark':'light');
    root.dataset.theme=on?'dark':'light';
    document.body.toggleAttribute('data-theme',false);
    if(on)document.body.setAttribute('data-theme','dark');else document.body.removeAttribute('data-theme');
    storage.set('dark',String(on));
    const icon=$('#dark-icon');if(icon)icon.className='bi '+(on?'bi-sun':'bi-moon-stars');
    const control=$('#dark-mode-btn');if(control){
      control.setAttribute('aria-pressed',String(on));
      control.setAttribute('aria-label',on?'Switch to light mode':'Switch to dark mode');
      control.setAttribute('title',on?'Switch to light mode':'Switch to dark mode');
    }
    const meta=$('meta[name="theme-color"]');if(meta)meta.setAttribute('content',on?'#0F1729':'#F5F7FB');
    const pref=$('#pref-dark');if(pref)pref.checked=on;
    // Keep ApexCharts annotations, grids and tooltips legible in either theme.
    chartInstances.forEach(chart=>{
      try{chart.updateOptions({theme:{mode:on?'dark':'light'},chart:{foreColor:on?'#C3D0E1':'#50647B'},grid:{borderColor:on?'#40536D':'#D9E2EC'},tooltip:{theme:on?'dark':'light'}},false,false);}catch(e){console.warn('Chart theme update skipped:',e);}
    });
    if(toast)notify((on?'Dark':'Light')+' mode enabled.','info','Theme');
  }
  function initTheme(){
    // Apply the saved theme on every page, including POS, authentication and error screens.
    applyTheme(storage.get('dark')==='true',false);
    $('#dark-mode-btn')?.addEventListener('click',()=>applyTheme(document.body.getAttribute('data-theme')!=='dark'));
  }
  function initNotifications(){const defaults=[{icon:'bi-cart3',msg:'New demo sale created',time:'Today'},{icon:'bi-box-seam',msg:'Sony WH-1000XM5 stock is low',time:'Today'},{icon:'bi-person-plus',msg:'New customer record available',time:'Yesterday'},{icon:'bi-receipt',msg:'Invoice INV-2046 is pending',time:'Yesterday'},{icon:'bi-arrow-left-right',msg:'Transfer TRF-001 completed',time:'Yesterday'}];
    const all=storage.json('notifications')??defaults,wrap=$('#notif-list');if(wrap)wrap.innerHTML=all.map(n=>'<div class="notif-item"><span class="notif-icon"><i class="bi '+esc(n.icon)+'"></i></span><div class="notif-body"><p>'+esc(n.msg)+'</p><span>'+esc(n.time)+'</span></div></div>').join('')||'<p class="small-muted m-3">No new notifications.</p>';
    const badge=$('#notif-count');if(badge)badge.textContent=String(all.length);
    $('#clear-all-notif')?.addEventListener('click',e=>{e.preventDefault();storage.set('notifications','[]');initNotificationsMarkupEmpty();notify('Notifications cleared.','info');});
  }
  function initNotificationsMarkupEmpty(){const wrap=$('#notif-list');if(wrap)wrap.innerHTML='<p class="small-muted m-3">No new notifications.</p>';if($('#notif-count'))$('#notif-count').textContent='0';}
  function initGlobalSearch(){const input=$('#global-search');if(!input)return;
    const links=$$('#sidebar a[href$=".html"]').filter(a=>a.getAttribute('href')!=='signin.html');const search=document.createElement('div');search.className='global-results d-none';input.parentElement.append(search);
    const onInput=()=>{const q=input.value.trim().toLowerCase();if(!q){search.classList.add('d-none');return;}const matches=links.filter(a=>a.textContent.trim().toLowerCase().includes(q)).slice(0,8);search.innerHTML=matches.map(a=>'<a href="'+esc(a.getAttribute('href'))+'"><span>'+esc(a.textContent.trim())+'</span><i class="bi bi-arrow-up-right"></i></a>').join('')||'<p class="small-muted p-3 mb-0">No matching page.</p>';search.classList.remove('d-none');};
    input.addEventListener('input',onInput);input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();search.querySelector('a')?.click();}if(e.key==='Escape')search.classList.add('d-none');});document.addEventListener('click',e=>{if(!input.parentElement.contains(e.target))search.classList.add('d-none');});
  }
  function initRecords(){
    initTables();
    document.addEventListener('click',onTableClick);
    document.addEventListener('click',e=>{
      const btn=e.target.closest('.btn-create');if(btn){openModal(btn.dataset.entity);return;}
      const filter=e.target.closest('.btn-toggle-filter');if(filter){filter.closest('.card-body')?.querySelector('.filter-panel')?.classList.toggle('d-none');filter.classList.toggle('active');return;}
      const reset=e.target.closest('.btn-reset-filter');if(reset){const card=reset.closest('.card-body');card?.querySelectorAll('.filter-panel input,.filter-panel select,.col-filter-row input,.dt-custom-search').forEach(el=>{el.value='';el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));});return;}
      const importPage=e.target.closest('.btn-import-page');if(importPage){importPage.closest('.page-actions')?.querySelector('.csv-import-input')?.click();return;}
      const exportPage=e.target.closest('.btn-export-page');if(exportPage){const table=$('table[data-entity]');if(table)csvExport(table.dataset.entity);return;}
      const exportSel=e.target.closest('.btn-bulk-export');if(exportSel){const table=exportSel.closest('.card-body')?.querySelector('table[data-entity]');if(table)csvExport(table.dataset.entity,currentSelected(table));return;}
      const cancel=e.target.closest('.btn-bulk-cancel');if(cancel){const table=cancel.closest('.card-body')?.querySelector('table[data-entity]');if(table){table.querySelectorAll('.row-cb,.select-all-cb').forEach(c=>{c.checked=false;c.indeterminate=false;});updateBulk(table);}return;}
      const statusBtn=e.target.closest('.btn-bulk-status');if(statusBtn){const table=statusBtn.closest('.card-body')?.querySelector('table[data-entity]');if(!table)return;const ids=currentSelected(table),rows=records(table.dataset.entity);if(!rows.some(r=>r.status!==undefined)){notify('This table has no status column.','info');return;}rows.filter(r=>ids.includes(r._id)).forEach(r=>r.status='Active');save(table.dataset.entity,rows);drawAll(table.dataset.entity);notify(ids.length+' statuses set to Active.');return;}
      const deleteBtn=e.target.closest('.btn-bulk-delete');if(deleteBtn){const table=deleteBtn.closest('.card-body')?.querySelector('table[data-entity]');if(!table)return;const ids=currentSelected(table);if(!ids.length)return;confirmAction('Delete '+ids.length+' records?','This removes the selected records from the demo.').then(ok=>{if(ok){save(table.dataset.entity,records(table.dataset.entity).filter(r=>!ids.includes(r._id)));drawAll(table.dataset.entity);notify(ids.length+' records deleted.');}else notify('Delete cancelled.','info');});return;}
    });
    document.addEventListener('change',e=>{if(e.target.matches('.csv-import-input')){const input=e.target,table=$('table[data-entity]');if(!input.files?.length||!table)return;const file=input.files[0];if(file.size>1000000){notify('CSV file exceeds the 1MB demo import limit.','error');input.value='';return;}const reader=new FileReader();reader.onload=()=>{try{const all=parseCSV(String(reader.result||''));const cols=table.dataset.cols.split(',');const headers=all.shift().map(x=>x.trim().toLowerCase().replace(/\s+/g,'_'));if(!cols.every(k=>headers.includes(k))){notify('CSV must include these headers: '+cols.join(', '),'error');return;}const arr=records(table.dataset.entity);all.filter(row=>row.some(x=>x.trim())).slice(0,500).forEach((line,index)=>{const r={_id:table.dataset.entity+'-'+Date.now()+'-'+index};cols.forEach(k=>r[k]=line[headers.indexOf(k)]||'');arr.push(r);});save(table.dataset.entity,arr);drawAll(table.dataset.entity);notify('CSV imported into your browser.');}catch(err){notify('CSV could not be parsed.','error');}finally{input.value='';}};reader.readAsText(file);return;}if(e.target.matches('table .row-cb'))updateBulk(e.target.closest('table'));else if(e.target.matches('table .select-all-cb')){const table=e.target.closest('table');table.querySelectorAll('tbody .row-cb').forEach(x=>x.checked=e.target.checked);updateBulk(table);}});
    $('#record-form')?.addEventListener('submit',e=>{e.preventDefault();const form=e.currentTarget;if(!validatedForm(form)||modalState.view)return;const obj=formValues(form);if(!validAmounts(obj))return;normalizeRow(obj);const entity=modalState.entity,items=records(entity);if(modalState.id){const index=items.findIndex(r=>r._id===modalState.id);if(index<0)return;items[index]={...items[index],...obj};}else{obj._id=entity+'-'+Date.now()+'-'+Math.random().toString(16).slice(2,6);items.unshift(obj);}save(entity,items);drawAll(entity);bootstrap.Modal.getInstance($('#record-modal'))?.hide();notify('Record '+(modalState.id?'updated':'saved')+' successfully.');});
    $$('.entry-form').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();if(!validatedForm(form))return;const entity=form.dataset.entity,obj=formValues(form);if(!validAmounts(obj))return;
      const list=records(entity),key='sku' in obj?'sku':'invoice';if(list.some(r=>r[key]===obj[key])){notify('Reference '+obj[key]+' already exists.','error','Duplicate reference');return;}normalizeRow(obj);if(entity==='sales')obj.due=money(number(obj.total)-number(obj.paid));obj._id=entity+'-'+Date.now();list.unshift(obj);save(entity,list);notify('Record saved in your browser.');setTimeout(()=>{location.href=form.dataset.back},400);
    }));
  }
  function initSettings(){
    $$('.settings-form').forEach(form=>{
      const key='settings:'+form.dataset.settings,old=storage.json(key);if(old)Object.entries(old).forEach(([name,val])=>{const el=form.elements.namedItem(name);if(el){if(el.type==='checkbox')el.checked=!!val;else el.value=String(val);}});
      if(form.dataset.settings==='preferences'){const dark=$('#pref-dark'),mini=$('#pref-mini');if(dark)dark.checked=storage.get('dark')==='true';if(mini)mini.checked=storage.get('sidebarMini')==='true';}
      form.addEventListener('submit',e=>{e.preventDefault();if(!validatedForm(form))return;const obj={};Array.from(form.elements).filter(x=>x.name).forEach(el=>{obj[el.name]=el.type==='checkbox'?el.checked:el.value});if(form.dataset.settings==='email'){delete obj.password;notify('SMTP password is intentionally not stored. A backend is required to configure email.','info');}
        storage.set(key,JSON.stringify(obj));if(form.dataset.settings==='preferences'){applyTheme(!!obj.dark,false);document.body.classList.toggle('mini-sidebar',!!obj.mini);storage.set('sidebarMini',String(!!obj.mini));const toggle=$('#toggle-sidebar');if(toggle){toggle.setAttribute('aria-expanded',String(!obj.mini));toggle.setAttribute('aria-label',obj.mini?'Expand sidebar':'Collapse sidebar');toggle.title=obj.mini?'Expand sidebar':'Collapse sidebar';}}notify('Demo settings saved locally.');});
    });
    $('#test-smtp')?.addEventListener('click',()=>notify('SMTP connection cannot be tested without a configured backend.','warning','Email'));
    $$('.payment-switch').forEach(input=>{input.checked=storage.get(input.id)==='true';input.addEventListener('change',()=>{storage.set(input.id,String(input.checked));notify('Payment UI preference updated. No payment gateway is connected.','info','Payment');});});
    const role=$('#perm-role'),perms=()=>$$('#permissions-table .perm-cb');
    function loadPermissions(){if(!role)return;const all=storage.json('permissions:'+role.value);perms().forEach(cb=>{cb.checked=all?!!all[cb.dataset.module+':'+cb.dataset.action]:cb.dataset.action==='View';});}
    role?.addEventListener('change',loadPermissions);loadPermissions();
    document.addEventListener('change',e=>{if(e.target.matches('.perm-row-all')){e.target.closest('tr').querySelectorAll('.perm-cb').forEach(cb=>cb.checked=e.target.checked);}if(e.target.matches('.perm-col-all')){const idx=Array.from(e.target.closest('tr').children).indexOf(e.target.closest('th'));$$('#permissions-table tbody tr').forEach(tr=>{const cb=tr.children[idx]?.querySelector('input');if(cb)cb.checked=e.target.checked;});}});
    $('#save-permissions')?.addEventListener('click',()=>{if(!role)return;let obj={};perms().forEach(cb=>obj[cb.dataset.module+':'+cb.dataset.action]=cb.checked);storage.set('permissions:'+role.value,JSON.stringify(obj));notify('Role matrix saved in this browser. Server-side permission enforcement is not enabled.','info','Permissions');});
    $$('.toggle-password').forEach(btn=>btn.addEventListener('click',()=>{const input=document.getElementById(btn.dataset.target);if(input)input.type=input.type==='password'?'text':'password';}));
    $('#new-password')?.addEventListener('input',e=>{const s=e.target.value;const n=[s.length>=8,/[A-Z]/.test(s),/\d/.test(s),/[^A-Za-z0-9]/.test(s)].filter(Boolean).length;const c=['#ddd','#ea5455','#ff9f43','#00cfe8','#28c76f'];if($('#pwd-strength-bar')){const b=$('#pwd-strength-bar');b.style.width=(25*n)+'%';b.style.background=c[n];}if($('#pwd-strength-label'))$('#pwd-strength-label').textContent=['Very weak','Weak','Fair','Good','Strong'][n];});
    $('#password-form')?.addEventListener('submit',e=>{e.preventDefault();const pwd=$('#new-password')?.value||'',confirm=$('#confirm-password')?.value||'';if(pwd!==confirm){notify('Passwords do not match.','error');return;}if(pwd.length<8){notify('Use at least 8 characters.','warning');return;}notify('Validation passed, but no real account password was changed.','info','Demo');e.target.reset();});
    $('#btn-report-generate')?.addEventListener('click',()=>notify('Charts show fixed demo figures; dynamic server reporting is not yet connected.','info','Reports'));
    $('#btn-report-reset')?.addEventListener('click',()=>{$('#report-range').value='';$('#report-module').selectedIndex=0;$('#report-warehouse').selectedIndex=0;notify('Report filters cleared.','info');});
    $('#btn-print-report')?.addEventListener('click',()=>window.print());
  }
  function initAuth(){const form=$('.auth-form');form?.addEventListener('submit',e=>{e.preventDefault();if(!validatedForm(form))return;if(form.dataset.mode==='signup'&&$('#auth-password').value!==$('#auth-confirm').value){notify('Passwords do not match.','error');return;}const email=$('#auth-email').value;storage.set('demoUserEmail',email);notify('Demo mode — no secure account authentication was performed.','info','Demo');setTimeout(()=>location.href='index.html',450);});}
  function initBarcode(){
    $('#generate-barcode')?.addEventListener('click',()=>{const selector=$('#barcode-product'),sku=selector.value,qty=Number($('#barcode-qty').value),format=$('#barcode-format').value,name=selector.selectedOptions[0]?.dataset.name||'';
      if(!sku||!Number.isInteger(qty)||qty<1||qty>100){notify('Select a product and a quantity from 1 to 100.','error');return;}
      if(format==='EAN13'&&!/^\d{12,13}$/.test(sku)){notify('EAN-13 requires a 12 or 13 digit numeric code. Choose Code128 for these product SKUs.','error');return;}
      if(!window.JsBarcode){notify('Barcode library unavailable. Check your internet connection.','error');return;}
      const grid=$('#barcode-grid');grid.innerHTML='';try{for(let i=0;i<qty;i++){const item=document.createElement('div');item.className='barcode-item';const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');item.append(svg);const a=document.createElement('div');a.className='small mt-1';a.textContent=name;const b=document.createElement('div');b.className='small text-muted';b.textContent=sku;item.append(a,b);grid.append(item);JsBarcode(svg,sku,{format:format==='EAN13'?'EAN13':'CODE128',width:1.5,height:50,displayValue:false,margin:5});}notify(qty+' barcode labels generated.');}catch(err){grid.innerHTML='';notify('Cannot generate this barcode: '+err.message,'error');}
    });
    $('#print-barcode')?.addEventListener('click',()=>{if(!$('#barcode-grid svg')){notify('Generate labels first.','warning');return;}window.print()});
  }
  function initPOS(){if(!$('#pos-order-body'))return;
    const cart=[],held=storage.json('heldPOS'),taxRate=.08;let discount=0,cash=0,numpad='';const available=()=>records('products');
    function refreshCatalog(){const grid=$('.pos-product-grid');if(!grid)return;grid.innerHTML=available().map(r=>'<button type="button" class="pos-product pos-add-btn" data-id="'+esc(r.sku)+'" data-category="'+esc(r.category)+'" aria-label="Add '+esc(r.name)+'"><div class="product-visual">'+iconForProduct(r.name)+'</div><h6>'+esc(r.name)+'</h6><span class="small-muted">'+esc(r.category)+' · '+esc(r.stock)+' in stock</span><b>'+esc(r.price)+'</b><span class="btn btn-primary btn-sm"><i class="bi bi-plus-lg me-1"></i>Add</span></button>').join('');}
    refreshCatalog();
    function subtotal(){return cart.reduce((a,i)=>a+i.price*i.qty,0)}function total(){return Math.max(0,subtotal()-discount)*(1+taxRate)}
    function render(){let sum=subtotal(),net=Math.max(0,sum-discount),tax=net*taxRate,price=net+tax;
      $('#pos-order-body').innerHTML=cart.length?cart.map(i=>'<tr data-sku="'+esc(i.id)+'"><td>'+esc(i.name)+'</td><td><div class="d-flex gap-1 align-items-center"><button class="btn btn-sm btn-outline-secondary pos-qty-btn" data-d="-1" aria-label="Decrease quantity">−</button><span>'+i.qty+'</span><button class="btn btn-sm btn-outline-secondary pos-qty-btn" data-d="1" aria-label="Increase quantity">+</button></div></td><td>'+money(i.price)+'</td><td>'+money(i.price*i.qty)+'</td><td><button class="btn btn-sm btn-link text-danger pos-remove-btn" aria-label="Remove item">×</button></td></tr>').join(''):'<tr><td colspan="5" class="text-center text-muted py-4">No items added yet</td></tr>';
      $('#pos-item-count').textContent=cart.reduce((n,x)=>n+x.qty,0)+' items';$('#pos-subtotal').textContent=money(sum);$('#pos-tax').textContent=money(tax);$('#pos-total').textContent=money(price);$('#pos-change').textContent=money(Math.max(0,cash-price));$('#pos-hold-btn').textContent=cart.length?'Hold':storage.json('heldPOS')?.length?'Resume held':'Hold';
    }
    function updateAmount(s){const n=Number(String(s).replace(/[$,\s]/g,''));if(!Number.isFinite(n)||n<0){notify('Enter a valid nonnegative amount.','error');return;}cash=n;render()}
    $('.pos-product-grid')?.addEventListener('click',e=>{const btn=e.target.closest('.pos-add-btn');if(!btn)return;const item=available().find(r=>r.sku===btn.dataset.id);if(!item)return;let existing=cart.find(x=>x.id===item.sku);if(number(item.stock)<=Number(existing?.qty||0)){notify('Insufficient stock for this product.','warning');return;}if(existing)existing.qty++;else cart.push({id:item.sku,name:item.name,price:number(item.price),qty:1});render();notify(item.name+' added to order.');});
    $('#pos-order-body').addEventListener('click',e=>{const tr=e.target.closest('tr[data-sku]');if(!tr)return;const sku=tr.dataset.sku,item=cart.find(x=>x.id===sku),qty=e.target.closest('.pos-qty-btn'),del=e.target.closest('.pos-remove-btn');if(del){cart.splice(cart.indexOf(item),1);render();return;}if(qty){const delta=Number(qty.dataset.d);if(delta>0&&item.qty>=number(available().find(x=>x.sku===sku)?.stock)){notify('Insufficient stock.','warning');return;}item.qty+=delta;if(item.qty<1)cart.splice(cart.indexOf(item),1);render();}});
    $('#pos-product-search')?.addEventListener('input',filterProducts);$$('.pos-category').forEach(btn=>btn.addEventListener('click',()=>{$$('.pos-category').forEach(b=>{b.classList.remove('btn-primary');b.classList.add('btn-outline-secondary')});btn.classList.add('btn-primary');btn.classList.remove('btn-outline-secondary');filterProducts();}));
    function filterProducts(){const term=($('#pos-product-search')?.value||'').toLowerCase(),cat=$('.pos-category.btn-primary')?.dataset.category||'All';$$('.pos-product').forEach(b=>{b.hidden=!(b.textContent.toLowerCase().includes(term)&&(cat==='All'||b.dataset.category===cat));});}
    $('#pos-discount-input')?.addEventListener('input',e=>{discount=Math.min(Math.max(0,number(e.target.value)),subtotal());render();});
    $('#pos-cash-display')?.addEventListener('input',e=>{numpad=e.target.value.replace(/[^\d.]/g,'');if((numpad.match(/\./g)||[]).length>1)numpad=numpad.slice(0,-1);updateAmount(numpad||0);});
    $$('.numpad-btn').forEach(btn=>btn.addEventListener('click',()=>{const v=btn.dataset.val;numpad=v==='backspace'?numpad.slice(0,-1):v==='.'&&numpad.includes('.')?numpad:numpad+v;$('#pos-cash-display').value=numpad;updateAmount(numpad||0); }));
    $('#pos-clear-btn')?.addEventListener('click',()=>{if(!cart.length)return;confirmAction('Clear cart?','All items will be removed from this cart.').then(ok=>{if(ok){cart.length=0;discount=0;cash=0;numpad='';$('#pos-cash-display').value='';$('#pos-discount-input').value='0';render();}})});
    $('#pos-hold-btn')?.addEventListener('click',()=>{if(cart.length){storage.set('heldPOS',JSON.stringify(cart));cart.length=0;render();notify('Sale held in this browser.','info');}else{const heldNow=storage.json('heldPOS');if(heldNow?.length){cart.push(...heldNow.filter(x=>available().some(p=>p.sku===x.id)));storage.set('heldPOS','[]');render();notify('Held sale restored.','info');}}});
    $('#pos-pay-btn')?.addEventListener('click',()=>{if(!cart.length){notify('Add products to the cart first.','error');return;}
      const method=$('input[name="pos-method"]:checked')?.value||'Cash',amount=total();if(method==='Cash'&&cash<amount){notify('Cash tendered must cover the total.','warning');return;}
      if(cart.some(i=>i.qty>number(available().find(p=>p.sku===i.id)?.stock))){notify('Stock has changed. Adjust cart quantities.','error');return;}
      const detail=cart.map(i=>({name:i.name,qty:i.qty,price:i.price}));const customerCode=$('#pos-customer')?.value;const customer=records('customers').find(c=>c.code===customerCode);
      const invoice='INV-'+Date.now().toString().slice(-8),rows=records('sales'),current=records('products');
      cart.forEach(i=>{const p=current.find(x=>x.sku===i.id);p.stock=String(number(p.stock)-i.qty);p.status=number(p.stock)===0?'Out of Stock':number(p.stock)<=10?'Low':'Active';});save('products',current);
      rows.unshift({_id:'sales-'+Date.now(),invoice,customer:customer?.name||'Walk-in customer',date:new Date().toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}).replaceAll(' ','-'),method,status:'Paid',total:money(amount),paid:money(amount),due:'$0.00'});save('sales',rows);refreshCatalog();
      const receipt=$('#pos-receipt');receipt.innerHTML='<h3>ERP PRO · RECEIPT</h3><p>DEMO / '+esc(invoice)+'<br>'+esc(new Date().toLocaleString())+'</p><hr>'+detail.map(i=>'<p>'+esc(i.name)+' × '+i.qty+' — '+money(i.price*i.qty)+'</p>').join('')+'<hr><strong>Total: '+money(amount)+'</strong><p>Method: '+esc(method)+'<br>Not a fiscal receipt.</p>';
      const change=Math.max(0,cash-amount);cart.length=0;discount=0;cash=0;numpad='';$('#pos-cash-display').value='';$('#pos-discount-input').value='0';render();
      if(window.Swal){Swal.fire({icon:'success',title:'Demo sale recorded',html:'<b>'+esc(invoice)+'</b><br>Total: '+money(amount)+(method==='Cash'?'<br>Change: '+money(change):'<br>Payment was simulated, not charged.'),showCancelButton:true,confirmButtonText:'Print receipt',cancelButtonText:'Close'}).then(x=>{if(x.isConfirmed)window.print();});}else notify('Demo sale recorded: '+invoice,'success');
    });
    if(held?.length)notify('There is a held sale. Click “Resume held” to restore it.','info','POS');render();
  }
  function initPlugins(){if(window.toastr){toastr.options={closeButton:true,progressBar:true,positionClass:'toast-top-right',preventDuplicates:true,timeOut:4000,extendedTimeOut:1500,newestOnTop:true,maxOpened:5};}
    if(window.flatpickr){$$('.flatpickr-date').forEach(el=>flatpickr(el,{dateFormat:'d-m-Y'}));$$('.flatpickr-range').forEach(el=>flatpickr(el,{mode:'range',dateFormat:'d-m-Y'}));}
    if(window.bootstrap?.Tooltip)$$('[data-bs-toggle="tooltip"]').forEach(x=>new bootstrap.Tooltip(x));
  }
  function registerChart(chart){
    chartInstances.push(chart);
    const result=chart.render();
    if(result&&typeof result.then==='function')result.then(()=>{
      if(document.body.getAttribute('data-theme')==='dark'){
        chart.updateOptions({theme:{mode:'dark'},chart:{foreColor:'#C3D0E1'},grid:{borderColor:'#40536D'},tooltip:{theme:'dark'}},false,false);
      }
    }).catch(error=>console.warn('Chart rendering issue:',error));
  }
  function initCharts(){if(!window.ApexCharts)return;
    /* Exact seed chart configurations from Section 11 of the provided prompt. */
if (document.querySelector('#sales-purchase-chart')) {
var salesPurchaseChart = new ApexCharts(document.querySelector('#sales-purchase-chart'), {
  series: [
    {
      name: 'Sales',
      data: [42000, 56000, 38000, 72000, 48000, 65000, 54000, 78000, 62000, 85000, 71000, 93000]
    },
    {
      name: 'Purchase',
      data: [28000, 34000, 25000, 41000, 31000, 38000, 29000, 47000, 36000, 52000, 44000, 58000]
    }
  ],
  chart:   { type: 'area', height: 300, toolbar: { show: false }, zoom: { enabled: false } },
  colors:  ['#28C76F', '#EA5455'],
  fill:    { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05 } },
  dataLabels: { enabled: false },
  stroke:  { curve: 'smooth', width: 2 },
  xaxis:   { categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
             labels: { style: { colors: '#637381' } } },
  yaxis:   { labels: { formatter: function (v) { return '$' + (v/1000).toFixed(0) + 'k'; },
             style: { colors: '#637381' } } },
  tooltip: { y: { formatter: function (v) { return '$' + v.toLocaleString(); } } },
  legend:  { position: 'top', horizontalAlign: 'right' },
  grid:    { borderColor: '#E8EBED', strokeDashArray: 4 }
});
registerChart(salesPurchaseChart);
}
if (document.querySelector('#category-donut-chart')) {
var categoryChart = new ApexCharts(document.querySelector('#category-donut-chart'), {
  series: [35, 25, 20, 12, 8],
  chart:  { type: 'donut', height: 280 },
  labels: ['Electronics', 'Clothing', 'Furniture', 'Food & Bev', 'Other'],
  colors: ['#FF9F43', '#28C76F', '#00CFE8', '#7367F0', '#EA5455'],
  legend: { position: 'bottom' },
  dataLabels: { enabled: false },
  plotOptions: { pie: { donut: { size: '65%',
    labels: { show: true,
      total: { show: true, label: 'Total Revenue',
        formatter: function () { return '$385K'; } } } } } },
  tooltip: { y: { formatter: function (v) { return v + '%'; } } }
});
registerChart(categoryChart);
}
if (document.querySelector('#top-products-chart')) {
var topProductsChart = new ApexCharts(document.querySelector('#top-products-chart'), {
  series: [{ name: 'Units Sold', data: [320, 290, 245, 210, 185, 160, 140] }],
  chart:  { type: 'bar', height: 260, toolbar: { show: false } },
  colors: ['#FF9F43'],
  plotOptions: { bar: { borderRadius: 6, horizontal: true, dataLabels: { position: 'top' } } },
  dataLabels:  { enabled: true, formatter: function (v) { return v + ' units'; },
                 offsetX: 5, style: { colors: ['#637381'], fontSize: '11px' } },
  xaxis: { categories: ['iPhone 15 Pro','MacBook Air','Samsung TV','AirPods Pro',
                         'iPad Mini','Sony Headphones','Dell Monitor'],
           labels: { style: { colors: '#637381' } } },
  grid:  { borderColor: '#E8EBED' }
});
registerChart(topProductsChart);
}
if (document.querySelector('#monthly-revenue-chart')) {
var revenueChart = new ApexCharts(document.querySelector('#monthly-revenue-chart'), {
  series: [{ name: 'Revenue', data: [93000,85000,71000,62000,78000,54000,65000,48000,72000,38000,56000,42000] }],
  chart:  { type: 'line', height: 300, toolbar: { show: true }, zoom: { enabled: true } },
  colors: ['#FF9F43'],
  stroke: { curve: 'smooth', width: 3 },
  markers:{ size: 5, colors: ['#fff'], strokeColors: '#FF9F43', strokeWidth: 2 },
  xaxis:  { categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
            labels: { style: { colors: '#637381' } } },
  yaxis:  { labels: { formatter: function (v) { return '$' + (v/1000).toFixed(0) + 'k'; } } },
  tooltip:{ y: { formatter: function (v) { return '$' + v.toLocaleString(); } } },
  grid:   { borderColor: '#E8EBED', strokeDashArray: 4 }
});
registerChart(revenueChart);
}
if (document.querySelector('#expense-chart')) {
var expenseChart = new ApexCharts(document.querySelector('#expense-chart'), {
  series: [28, 22, 18, 15, 10, 7],
  chart:  { type: 'donut', height: 260 },
  labels: ['Salaries','Rent','Utilities','Marketing','Logistics','Other'],
  colors: ['#1B2850','#FF9F43','#28C76F','#EA5455','#00CFE8','#7367F0'],
  legend: { position: 'bottom' },
  dataLabels: { enabled: false },
  plotOptions: { pie: { donut: { size: '60%' } } }
});
registerChart(expenseChart);
}
  }
  window.addEventListener('load',()=>{const loader=$('#page-loader');if(loader){loader.style.opacity='0';setTimeout(()=>loader.remove(),350);}});
  document.addEventListener('DOMContentLoaded',()=>{setTimeout(()=>$('#page-loader')?.remove(),800);initPlugins();initTheme();initShell();initRecords();initSettings();initAuth();initBarcode();initPOS();initCharts();});
  window.ERP_DEMO={records,save,drawAll,csvExport};
})();

/* Optional public donation link: only show when an HTTPS link is configured. */
(function setupProjectDonationLink() {
  function install() {
    var value = window.ERP_CONFIG && window.ERP_CONFIG.donationUrl;
    if (typeof value !== 'string' || !value.trim()) return;
    try {
      var parsed = new URL(value.trim());
      if (parsed.protocol !== 'https:' || !parsed.hostname || parsed.username || parsed.password) return;
      document.querySelectorAll('[data-donation-link]').forEach(function (link) {
        link.href = parsed.href;
        link.hidden = false;
      });
    } catch (error) { /* Invalid or unset URL: leave donation links hidden. */ }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install);
  else install();
})();
