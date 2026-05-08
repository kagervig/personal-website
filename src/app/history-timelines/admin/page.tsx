'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  LogOut, Plus, Edit2, Trash2, RotateCcw, X, ArrowLeft, Check, AlertCircle,
  ChevronUp, ChevronDown, BookOpen, Lock,
} from 'lucide-react';
import { timelines } from '@/lib/history-timeline/data';
import { TimelineId, Era, Ruler, Event, Construction } from '@/lib/history-timeline/types';
import { getMergedTimelineData, isAdded, addItem, editItem, deleteItem, ItemType, getAdminData, restoreItem } from '@/lib/history-timeline/adminStore';
import { Tour, TourSlide } from '@/lib/history-timeline/tourTypes';
import { getToursForTimeline, getAllAdminTours, saveTour, deleteTour, createTour, createSlide } from '@/lib/history-timeline/tourStore';
import { ThemeProvider } from '@/lib/history-timeline/theme';


const CATEGORIES_EVENT = ['war', 'politics', 'religion', 'science', 'exploration', 'legislation', 'disaster', 'culture', 'trade', 'climate'];
const CATEGORIES_CONSTRUCTION = ['monument', 'temple', 'palace', 'fort', 'road', 'bridge', 'church', 'castle', 'landmark'];
const ZOOM_PRESETS = ['millennia', 'centuries', 'decades'] as const;
const HIGHLIGHT_TYPES = ['none', 'era', 'ruler', 'event', 'construction'] as const;

type AdminSection = 'data' | 'tours';

function AdminContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [activeTimeline, setActiveTimeline] = useState<TimelineId>('egypt');
  const [adminSection, setAdminSection] = useState<AdminSection>('data');
  const [activeTab, setActiveTab] = useState<ItemType>('eras');

  const [searchQuery, setSearchQuery] = useState('');
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [refreshCount, setRefreshCount] = useState(0);

  // Tour state
  const [tourRefresh, setTourRefresh] = useState(0);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [editingSlide, setEditingSlide] = useState<TourSlide | null>(null);
  const [isAddingTour, setIsAddingTour] = useState(false);
  const [newTourTitle, setNewTourTitle] = useState('');
  const [newTourDesc, setNewTourDesc] = useState('');
  const [deleteTourConfirm, setDeleteTourConfirm] = useState<string | null>(null);

  useEffect(() => {
    const auth = localStorage.getItem('ht_admin_authenticated');
    if (auth === 'true') setIsAuthenticated(true);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/history-timelines/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      
      const data = await res.json();
      
      if (data.success) {
        localStorage.setItem('ht_admin_authenticated', 'true');
        setIsAuthenticated(true);
      } else {
        setError(data.message || 'Incorrect password');
      }
    } catch (err) {
      setError('Failed to authenticate');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('ht_admin_authenticated');
    setIsAuthenticated(false);
    setPassword('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center p-4 font-sans text-gray-300 history-timeline-root">
        <div className="w-full max-w-md bg-[#161b22] border border-[#30363d] rounded-xl shadow-2xl p-8">
          <h1 className="text-2xl font-bold text-white text-center mb-2">History Timeline</h1>
          <h2 className="text-lg text-gray-400 text-center mb-8">Admin Panel</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter admin password"
                disabled={loading}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded-md transition-colors disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Checking...' : 'Enter'}
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link href="/history-timelines" className="text-sm text-gray-500 hover:text-gray-300 flex items-center justify-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Return to Timeline
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Data section state
  const baseTimeline = timelines.find(t => t.id === activeTimeline)!;
  const mergedTimeline = getMergedTimelineData(baseTimeline);
  const items = mergedTimeline[activeTab] || [];
  const adminData = getAdminData();
  const deletedIds = adminData[activeTimeline]?.deleted || [];
  const deletedItems = baseTimeline[activeTab].filter((i: any) => deletedIds.includes(i.id));
  const allItems = [...items, ...deletedItems.map((i: any) => ({ ...i, _deleted: true }))];
  const filteredItems = allItems
    .filter((i: any) =>
      i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (i.description && i.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a: any, b: any) => (a.startYear ?? a.year) - (b.startYear ?? b.year));

  const handleDelete = (id: string) => {
    deleteItem(activeTimeline, activeTab, id);
    setDeleteConfirm(null);
    setRefreshCount(c => c + 1);
  };

  const handleRestore = (id: string) => {
    restoreItem(activeTimeline, id);
    setRefreshCount(c => c + 1);
  };

  // Tour section
  const allTours = getToursForTimeline(activeTimeline);
  const adminOnlyTours = getAllAdminTours().filter(t => t.timelineId === activeTimeline);
  const staticTours = allTours.filter(t => t.isStatic);

  const handleCreateTour = () => {
    if (!newTourTitle.trim()) return;
    const tour = createTour(activeTimeline, newTourTitle.trim(), newTourDesc.trim() || undefined);
    saveTour(tour);
    setNewTourTitle('');
    setNewTourDesc('');
    setIsAddingTour(false);
    setTourRefresh(c => c + 1);
    setEditingTour(tour);
  };

  const handleDeleteTour = (id: string) => {
    deleteTour(id);
    setDeleteTourConfirm(null);
    setTourRefresh(c => c + 1);
    if (editingTour?.id === id) setEditingTour(null);
  };

  const handleSaveTourMeta = (tour: Tour) => {
    saveTour(tour);
    setEditingTour(tour);
    setTourRefresh(c => c + 1);
  };

  const handleSaveSlide = (slide: TourSlide) => {
    if (!editingTour) return;
    const slides = [...editingTour.slides];
    const idx = slides.findIndex(s => s.id === slide.id);
    if (idx >= 0) slides[idx] = slide;
    else slides.push(slide);
    const updated = { ...editingTour, slides };
    saveTour(updated);
    setEditingTour(updated);
    setEditingSlide(null);
    setTourRefresh(c => c + 1);
  };

  const handleDeleteSlide = (slideId: string) => {
    if (!editingTour) return;
    const updated = { ...editingTour, slides: editingTour.slides.filter(s => s.id !== slideId) };
    saveTour(updated);
    setEditingTour(updated);
    setTourRefresh(c => c + 1);
  };

  const handleMoveSlide = (idx: number, dir: -1 | 1) => {
    if (!editingTour) return;
    const slides = [...editingTour.slides];
    const swap = idx + dir;
    if (swap < 0 || swap >= slides.length) return;
    [slides[idx], slides[swap]] = [slides[swap], slides[idx]];
    const updated = { ...editingTour, slides };
    saveTour(updated);
    setEditingTour(updated);
  };

  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col text-gray-300 font-sans history-timeline-root">
      {/* Top Bar */}
      <header className="h-[60px] shrink-0 border-b border-[#30363d] bg-[#161b22] px-6 flex items-center justify-between z-20">
        <h1 className="text-xl font-bold text-white">History Timeline <span className="text-gray-500 font-normal ml-2">Admin Panel</span></h1>
        <div className="flex items-center gap-6">
          <Link href="/history-timelines" className="text-sm text-gray-400 hover:text-white flex items-center gap-1.5 transition-colors">
            <ArrowLeft className="w-4 h-4" /> View Site
          </Link>
          <button onClick={handleLogout} className="text-sm text-gray-400 hover:text-red-400 flex items-center gap-1.5 transition-colors">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 shrink-0 border-r border-[#30363d] bg-[#0d1117] flex flex-col">
          <div className="p-4 space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Select Timeline</label>
              <div className="space-y-1">
                {timelines.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTimeline(t.id)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTimeline === t.id ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30' : 'text-gray-400 hover:bg-[#161b22] hover:text-gray-200'}`}
                  >
                    {t.title}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Manage</label>
              <div className="space-y-1">
                <button
                  onClick={() => setAdminSection('data')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${adminSection === 'data' ? 'bg-[#1f2937] text-white' : 'text-gray-400 hover:bg-[#161b22]'}`}
                >
                  Timeline Data
                </button>
                <button
                  onClick={() => setAdminSection('tours')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${adminSection === 'tours' ? 'bg-[#1f2937] text-white' : 'text-gray-400 hover:bg-[#161b22]'}`}
                >
                  Guided Tours
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col bg-[#0d1117] overflow-hidden relative">
          {adminSection === 'data' && (
            <>
              {/* Data Toolbar */}
              <div className="h-[64px] border-b border-[#30363d] bg-[#161b22] px-6 flex items-center justify-between gap-4">
                <div className="flex gap-2">
                  {(['eras', 'rulers', 'events', 'constructions'] as ItemType[]).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium capitalize transition-colors ${activeTab === tab ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="flex-1 max-w-sm">
                  <input
                    type="text"
                    placeholder={`Search ${activeTab}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  onClick={() => setIsAdding(true)}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-md text-sm font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add {activeTab.slice(0, -1)}
                </button>
              </div>

              {/* Data Table */}
              <div className="flex-1 overflow-auto p-6">
                <div className="bg-[#161b22] border border-[#30363d] rounded-lg overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead className="text-xs text-gray-400 uppercase bg-[#1f2937] border-b border-[#30363d]">
                      <tr>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">Date / Range</th>
                        <th className="px-4 py-3">Category</th>
                        <th className="px-4 py-3">Source</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#30363d]">
                      {filteredItems.map((item: any) => {
                        const isAddedItem = isAdded(activeTimeline, activeTab, item.id);
                        const isDeleted = item._deleted;
                        return (
                          <tr key={item.id} className={`hover:bg-[#1f2937]/50 ${isDeleted ? 'opacity-50' : ''}`}>
                            <td className="px-4 py-3 font-medium text-gray-200">
                              <span className={isDeleted ? 'line-through text-gray-500' : ''}>{item.name}</span>
                            </td>
                            <td className="px-4 py-3 text-gray-400">
                              {item.startYear !== undefined ? `${item.startYear} to ${item.endYear}` : item.year}
                            </td>
                            <td className="px-4 py-3">
                              {item.category ? (
                                <span className="px-2 py-1 rounded bg-[#30363d] text-xs text-gray-300 capitalize">{item.category}</span>
                              ) : '-'}
                            </td>
                            <td className="px-4 py-3">
                              {isAddedItem ? (
                                <span className="px-2 py-1 rounded bg-green-900/30 text-green-400 text-xs font-medium">Added</span>
                              ) : (
                                <span className="px-2 py-1 rounded bg-[#30363d] text-gray-400 text-xs font-medium">Built-in</span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-right">
                              <div className="flex items-center justify-end gap-2">
                                {isDeleted ? (
                                  <button onClick={() => handleRestore(item.id)} className="text-gray-400 hover:text-white p-1" title="Restore">
                                    <RotateCcw className="w-4 h-4" />
                                  </button>
                                ) : (
                                  <>
                                    <button onClick={() => setEditingItem(item)} className="text-gray-400 hover:text-white p-1" title="Edit">
                                      <Edit2 className="w-4 h-4" />
                                    </button>
                                    {deleteConfirm === item.id ? (
                                      <div className="flex items-center gap-1 bg-red-900/30 rounded px-2 py-1">
                                        <span className="text-xs text-red-400 font-medium">Sure?</span>
                                        <button onClick={() => handleDelete(item.id)} className="text-white hover:text-red-200"><Check className="w-3 h-3"/></button>
                                        <button onClick={() => setDeleteConfirm(null)} className="text-gray-400 hover:text-white"><X className="w-3 h-3"/></button>
                                      </div>
                                    ) : (
                                      <button onClick={() => setDeleteConfirm(item.id)} className="text-gray-400 hover:text-red-400 p-1" title="Delete">
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    )}
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                      {filteredItems.length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-4 py-8 text-center text-gray-500">No items found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {(isAdding || editingItem) && (
                <div className="absolute inset-0 bg-black/50 z-40 flex justify-end">
                  <div className="w-[500px] h-full bg-[#161b22] border-l border-[#30363d] shadow-2xl flex flex-col animate-in slide-in-from-right">
                    <ItemForm
                      timelineId={activeTimeline}
                      type={activeTab}
                      item={editingItem}
                      onClose={() => { setIsAdding(false); setEditingItem(null); }}
                      onSave={() => { setIsAdding(false); setEditingItem(null); setRefreshCount(c => c + 1); }}
                    />
                  </div>
                </div>
              )}
            </>
          )}

          {adminSection === 'tours' && (
            <div className="flex-1 overflow-y-auto">
              {!editingTour && (
                <div className="p-6 space-y-6">
                  {staticTours.length > 0 && (
                    <div>
                      <h3 className="text-xs font-bold text-gray-500 tracking-wider mb-3 flex items-center gap-2">
                        <Lock className="w-3 h-3" /> BUILT-IN TOURS (READ ONLY)
                      </h3>
                      <div className="space-y-2">
                        {staticTours.map(tour => (
                          <div key={tour.id} className="flex items-center justify-between bg-[#161b22] border border-[#30363d] rounded-lg px-4 py-3">
                            <div>
                              <div className="text-sm font-medium text-gray-200">{tour.title}</div>
                              <div className="text-xs text-gray-500 mt-0.5">{tour.slides.length} slides · {tour.description}</div>
                            </div>
                            <span className="text-xs px-2 py-1 rounded bg-[#30363d] text-gray-400">Built-in</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xs font-bold text-gray-500 tracking-wider flex items-center gap-2">
                        <BookOpen className="w-3 h-3" /> CUSTOM TOURS
                      </h3>
                      <button
                        onClick={() => setIsAddingTour(true)}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1.5 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" /> Create Tour
                      </button>
                    </div>

                    {isAddingTour && (
                      <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 mb-3 space-y-3">
                        <input
                          type="text"
                          placeholder="Tour title..."
                          value={newTourTitle}
                          onChange={e => setNewTourTitle(e.target.value)}
                          className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                        />
                        <input
                          type="text"
                          placeholder="Short description (optional)..."
                          value={newTourDesc}
                          onChange={e => setNewTourDesc(e.target.value)}
                          className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                        />
                        <div className="flex gap-2">
                          <button onClick={handleCreateTour} disabled={!newTourTitle.trim()} className="bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white px-4 py-1.5 rounded text-sm font-medium transition-colors">
                            Create & Edit Slides
                          </button>
                          <button onClick={() => setIsAddingTour(false)} className="px-4 py-1.5 text-sm text-gray-400 hover:text-white transition-colors">
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}

                    {adminOnlyTours.length === 0 && !isAddingTour && (
                      <p className="text-sm text-gray-500 py-4">No custom tours yet. Create one above.</p>
                    )}

                    <div className="space-y-2">
                      {adminOnlyTours.map(tour => (
                        <div key={tour.id} className="flex items-center justify-between bg-[#161b22] border border-[#30363d] rounded-lg px-4 py-3">
                          <div>
                            <div className="text-sm font-medium text-gray-200">{tour.title}</div>
                            <div className="text-xs text-gray-500 mt-0.5">{tour.slides.length} slides{tour.description ? ` · ${tour.description}` : ''}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => setEditingTour(tour)} className="text-gray-400 hover:text-white p-1 text-xs" title="Edit slides">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            {deleteTourConfirm === tour.id ? (
                              <div className="flex items-center gap-1 bg-red-900/30 rounded px-2 py-1">
                                <span className="text-xs text-red-400">Sure?</span>
                                <button onClick={() => handleDeleteTour(tour.id)} className="text-white"><Check className="w-3 h-3"/></button>
                                <button onClick={() => setDeleteTourConfirm(null)} className="text-gray-400"><X className="w-3 h-3"/></button>
                              </div>
                            ) : (
                              <button onClick={() => setDeleteTourConfirm(tour.id)} className="text-gray-400 hover:text-red-400 p-1">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {editingTour && !editingTour.isStatic && (
                <div className="p-6 space-y-5 relative">
                  <button
                    onClick={() => { setEditingTour(null); setEditingSlide(null); }}
                    className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors mb-2"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back to Tours
                  </button>

                  <TourMetaForm tour={editingTour} onSave={handleSaveTourMeta} />

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-gray-200">Slides ({editingTour.slides.length})</h3>
                      <button
                        onClick={() => setEditingSlide(createSlide())}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1.5 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Slide
                      </button>
                    </div>

                    <div className="space-y-2">
                      {editingTour.slides.map((slide, idx) => (
                        <div key={slide.id} className="flex items-start gap-3 bg-[#161b22] border border-[#30363d] rounded-lg px-4 py-3">
                          <div className="flex flex-col gap-1 shrink-0 mt-0.5">
                            <button onClick={() => handleMoveSlide(idx, -1)} disabled={idx === 0} className="text-gray-500 hover:text-gray-200 disabled:opacity-20">
                              <ChevronUp className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-xs text-gray-600 text-center leading-none">{idx + 1}</span>
                            <button onClick={() => handleMoveSlide(idx, 1)} disabled={idx === editingTour.slides.length - 1} className="text-gray-500 hover:text-gray-200 disabled:opacity-20">
                              <ChevronDown className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-gray-200 truncate">{slide.title || <span className="italic text-gray-500">Untitled slide</span>}</div>
                            {slide.subtitle && <div className="text-xs text-gray-500">{slide.subtitle}</div>}
                          </div>
                          <div className="flex gap-1 shrink-0">
                            <button onClick={() => setEditingSlide(slide)} className="text-gray-400 hover:text-white p-1">
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={() => handleDeleteSlide(slide.id)} className="text-gray-400 hover:text-red-400 p-1">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {editingSlide && (
                    <div className="absolute inset-0 bg-black/50 z-40 flex justify-end">
                      <div className="w-[520px] h-full bg-[#161b22] border-l border-[#30363d] shadow-2xl flex flex-col">
                        <SlideForm
                          slide={editingSlide}
                          timelineId={activeTimeline}
                          onClose={() => setEditingSlide(null)}
                          onSave={handleSaveSlide}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function TourMetaForm({ tour, onSave }: { tour: Tour; onSave: (t: Tour) => void }) {
  const [title, setTitle] = useState(tour.title);
  const [desc, setDesc] = useState(tour.description || '');

  useEffect(() => { setTitle(tour.title); setDesc(tour.description || ''); }, [tour.id]);

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 space-y-3">
      <h3 className="text-sm font-semibold text-gray-200">Tour Details</h3>
      <div>
        <label className="block text-xs text-gray-400 mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-xs text-gray-400 mb-1">Description</label>
        <input
          type="text"
          value={desc}
          onChange={e => setDesc(e.target.value)}
          className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
          placeholder="Short description..."
        />
      </div>
      <button
        onClick={() => onSave({ ...tour, title, description: desc || undefined })}
        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded text-sm font-medium transition-colors"
      >
        Save Details
      </button>
    </div>
  );
}

function SlideForm({ slide, timelineId, onClose, onSave }: { slide: TourSlide; timelineId: string; onClose: () => void; onSave: (s: TourSlide) => void; }) {
  const mergedData = getMergedTimelineData(timelines.find(t => t.id === timelineId)!);
  const [form, setForm] = useState<TourSlide>({ ...slide });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (field: keyof TourSlide, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const itemsForType = (): { id: string; name: string }[] => {
    if (form.highlightType === 'era') return mergedData.eras;
    if (form.highlightType === 'ruler') return mergedData.rulers;
    if (form.highlightType === 'event') return mergedData.events;
    if (form.highlightType === 'construction') return mergedData.constructions;
    return [];
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.title.trim()) errs.title = 'Title is required';
    if (!form.text.trim()) errs.text = 'Narrative text is required';
    if (form.year === undefined || form.year === null || String(form.year) === '') errs.year = 'Year is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSave({ ...form, year: Number(form.year) });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#30363d] bg-[#1f2937]">
        <h3 className="text-lg font-bold text-white">Edit Slide</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <SlideField label="Title" error={errors.title}>
          <input type="text" value={form.title} onChange={e => set('title', e.target.value)} className="slide-input" placeholder="Slide heading..." />
        </SlideField>

        <SlideField label="Subtitle (optional)">
          <input type="text" value={form.subtitle || ''} onChange={e => set('subtitle', e.target.value)} className="slide-input" placeholder="Short contextual note..." />
        </SlideField>

        <SlideField label="Narrative Text" error={errors.text}>
          <textarea value={form.text} onChange={e => set('text', e.target.value)} className="slide-input min-h-[140px] resize-y" placeholder="2–3 sentences about this moment in history..." />
        </SlideField>

        <SlideField label="Year to navigate to" error={errors.year} helper="Use negative for BCE (e.g. -3100)">
          <input type="number" value={form.year} onChange={e => set('year', e.target.value)} className="slide-input" placeholder="-3100" />
        </SlideField>

        <SlideField label="Zoom Level">
          <select value={form.zoomPreset} onChange={e => set('zoomPreset', e.target.value as any)} className="slide-input capitalize">
            {ZOOM_PRESETS.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </SlideField>

        <SlideField label="Highlight Item">
          <select
            value={form.highlightType || 'none'}
            onChange={e => {
              const val = e.target.value as any;
              set('highlightType', val === 'none' ? undefined : val);
              set('highlightId', undefined);
            }}
            className="slide-input capitalize mb-2"
          >
            {HIGHLIGHT_TYPES.map(t => <option key={t} value={t}>{t === 'none' ? 'None' : t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
          </select>

          {form.highlightType && (
            <select
              value={form.highlightId || ''}
              onChange={e => set('highlightId', e.target.value || undefined)}
              className="slide-input"
            >
              <option value="">— choose item —</option>
              {itemsForType().map((item: any) => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          )}
        </SlideField>
      </div>

      <div className="p-6 border-t border-[#30363d] bg-[#1f2937] flex justify-end gap-3">
        <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors">Cancel</button>
        <button onClick={handleSubmit} className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors">
          Save Slide
        </button>
      </div>

      <style jsx>{`
        .slide-input {
          width: 100%;
          background-color: #0d1117;
          border: 1px solid #30363d;
          border-radius: 0.375rem;
          padding: 0.5rem 0.75rem;
          color: white;
          font-size: 0.875rem;
          outline: none;
        }
        .slide-input:focus { border-color: #3b82f6; }
      `}</style>
    </div>
  );
}

function SlideField({ label, error, helper, children }: { label: string; error?: string; helper?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
      {children}
      {helper && !error && <p className="text-xs text-gray-500 mt-1">{helper}</p>}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function ItemForm({ timelineId, type, item, onClose, onSave }: { timelineId: string; type: ItemType; item: any | null; onClose: () => void; onSave: () => void }) {
  const isEditing = !!item;
  const isStatic = isEditing && !isAdded(timelineId, type, item.id);

  const [formData, setFormData] = useState<any>(item || {
    name: '', startYear: '', endYear: '', year: '', description: '',
    wikipediaUrl: '', imageUrl: '',
    category: type === 'events' ? 'politics' : type === 'constructions' ? 'monument' : undefined,
    colour: '#3b82f6', unknown: false, eraId: '', shortName: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.wikipediaUrl) newErrors.wikipediaUrl = 'Wikipedia URL is required';
    if (type === 'eras' || type === 'rulers') {
      if (formData.startYear === '') newErrors.startYear = 'Start year is required';
      if (formData.endYear === '') newErrors.endYear = 'End year is required';
      if (Number(formData.startYear) > Number(formData.endYear)) newErrors.endYear = 'End year must be after start year';
    } else {
      if (formData.year === '') newErrors.year = 'Year is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const submitData = { ...formData };
    if (submitData.startYear !== undefined) submitData.startYear = Number(submitData.startYear);
    if (submitData.endYear !== undefined) submitData.endYear = Number(submitData.endYear);
    if (submitData.year !== undefined) submitData.year = Number(submitData.year);
    if (isEditing) {
      editItem(timelineId, type, submitData);
    } else {
      submitData.id = submitData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-' + Date.now();
      addItem(timelineId, type, submitData);
    }
    onSave();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#30363d] bg-[#1f2937]">
        <h3 className="text-lg font-bold text-white">
          {isEditing ? `Edit ${type.slice(0, -1)}` : `Add New ${type.slice(0, -1)}`}
        </h3>
        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-5">
        {isStatic && (
          <div className="bg-blue-900/20 border border-blue-900 text-blue-300 px-4 py-3 rounded-md flex gap-3 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>Editing a built-in item. Your changes are saved locally and override the original.</p>
          </div>
        )}
        <div className="space-y-4">
          <Field label="Name" error={errors.name}>
            <input type="text" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} className="input-field" placeholder="E.g. Julius Caesar" />
          </Field>
          {type === 'eras' && (
            <Field label="Short Name (Optional)">
              <input type="text" value={formData.shortName || ''} onChange={(e) => handleChange('shortName', e.target.value)} className="input-field" placeholder="E.g. Old Kingdom" />
            </Field>
          )}
          {(type === 'eras' || type === 'rulers') && (
            <div className="grid grid-cols-2 gap-4">
              <Field label="Start Year" error={errors.startYear} helper="Use negative for BCE">
                <input type="number" value={formData.startYear} onChange={(e) => handleChange('startYear', e.target.value)} className="input-field" placeholder="-44" />
              </Field>
              <Field label="End Year" error={errors.endYear} helper="Use negative for BCE">
                <input type="number" value={formData.endYear} onChange={(e) => handleChange('endYear', e.target.value)} className="input-field" placeholder="14" />
              </Field>
            </div>
          )}
          {(type === 'events' || type === 'constructions') && (
            <Field label="Year" error={errors.year} helper="Use negative for BCE">
              <input type="number" value={formData.year} onChange={(e) => handleChange('year', e.target.value)} className="input-field" placeholder="-44" />
            </Field>
          )}
          <Field label="Description" error={errors.description}>
            <textarea value={formData.description} onChange={(e) => handleChange('description', e.target.value)} className="input-field min-h-[120px] resize-y" placeholder="Content goes here..." />
          </Field>
          <Field label="Wikipedia URL" error={errors.wikipediaUrl}>
            <input type="url" value={formData.wikipediaUrl} onChange={(e) => handleChange('wikipediaUrl', e.target.value)} className="input-field" placeholder="https://en.wikipedia.org/wiki/..." />
          </Field>
          <Field label="Image URL (Optional)">
            <input type="url" value={formData.imageUrl || ''} onChange={(e) => handleChange('imageUrl', e.target.value)} className="input-field" placeholder="https://..." />
          </Field>
        </div>
      </div>

      <div className="p-6 border-t border-[#30363d] bg-[#1f2937] flex justify-end gap-3">
        <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors">Cancel</button>
        <button onClick={handleSubmit} className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors">
          Save Changes
        </button>
      </div>

      <style jsx>{`
        .input-field {
          width: 100%;
          background-color: #0d1117;
          border: 1px solid #30363d;
          border-radius: 0.375rem;
          padding: 0.5rem 0.75rem;
          color: white;
          font-size: 0.875rem;
          outline: none;
        }
        .input-field:focus { border-color: #3b82f6; }
      `}</style>
    </div>
  );
}

function Field({ label, error, helper, children }: { label: string; error?: string; helper?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
      {children}
      {helper && !error && <p className="text-xs text-gray-500 mt-1">{helper}</p>}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

export default function AdminPage() {
  return (
    <ThemeProvider>
      <AdminContent />
    </ThemeProvider>
  );
}
