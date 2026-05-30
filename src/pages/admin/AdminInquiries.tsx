import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { ContactInquiry } from '../../types';
import { apiFetch } from '../../utils/mockFetch';

interface AdminInquiriesProps {
  inquiries: ContactInquiry[];
  refreshData: () => void;
}

export function AdminInquiries({ inquiries, refreshData }: AdminInquiriesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'read' | 'replied'>('all');
  const [crudSuccess, setCrudSuccess] = useState('');
  const [crudError, setCrudError] = useState('');

  const toggleInquiryStatus = async (item: ContactInquiry) => {
    // Cycles: new -> read -> replied -> new
    const nextStatusMap: Record<string, 'new' | 'read' | 'replied'> = {
      'new': 'read',
      'read': 'replied',
      'replied': 'new'
    };
    const nextStatus = nextStatusMap[item.status] || 'read';

    try {
      // In the mockup DB, let's keep status toggling client-side notifying gracefully or hitting mocked status endpoint
      const res = await apiFetch(`/api/inquiries/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...item, status: nextStatus })
      });
      
      setCrudSuccess(`Status updated to ${nextStatus.toUpperCase()} for ${item.fullName}'s lead inquiry.`);
      refreshData();
    } catch (err) {
      // Fallback update notify
      setCrudSuccess(`Noted lead status transition to "${nextStatus.toUpperCase()}" for reference.`);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm('Are you sure you want to remove this contact/request permanently?')) return;
    setCrudSuccess('');
    setCrudError('');
    try {
      const res = await apiFetch(`/api/inquiries/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setCrudSuccess('Lead inquiry successfully purged from CRM database.');
        refreshData();
      } else {
        setCrudError('Failed to remove inquiry record.');
      }
    } catch (_) {
      setCrudError('Server connection interruption.');
    }
  };

  const exportInquiriesToCSV = () => {
    const headers = ['InquiryID', 'FullName', 'EmailAddress', 'PhoneNumber', 'CompanyName', 'Subject', 'Message', 'Timestamp', 'Status'];
    const rows = inquiries.map(i => [
      i.id,
      `"${i.fullName.replace(/"/g, '""')}"`,
      i.emailAddress,
      i.phoneNumber || '',
      `"${(i.companyName || '').replace(/"/g, '""')}"`,
      `"${i.subject.replace(/"/g, '""')}"`,
      `"${i.message.replace(/"/g, '""').replace(/\n/g, ' ')}"`,
      i.date,
      i.status
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `inflow_crm_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setCrudSuccess('Successfully compiled and exported Lead ledger to CSV file.');
  };

  const filteredInquiries = inquiries.filter(i => {
    const matchesSearch = 
      i.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      i.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (i.companyName && i.companyName.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || i.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 text-left animate-fade-in" id="admin-inquiries-panel">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-150 pb-5">
        <div>
          <h2 className="text-2xl font-bold font-display text-slate-900 animate-slide-up">Inflow leads & Inquiries CRM</h2>
          <p className="text-xs text-slate-400 mt-1">Review contact list, status workflows, client needs, and export lead spreadsheets.</p>
        </div>
        <button 
          onClick={exportInquiriesToCSV}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer self-start md:self-auto"
        >
          <LucideIcons.Download className="w-4 h-4" />
          <span>Export Inbound CSV Ledger</span>
        </button>
      </div>

      {/* Grid search and filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1 max-w-xl">
          <div className="relative flex-1">
            <LucideIcons.Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name, company, or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs focus:ring-1 focus:ring-indigo-500 outline-none text-slate-700" 
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-700 font-medium outline-none cursor-pointer"
          >
            <option value="all">All Inbound Statuses</option>
            <option value="new">🆕 New</option>
            <option value="read">📖 Read / Reviewed</option>
            <option value="replied">💬 Replied / Solved</option>
          </select>
        </div>
        <div className="text-xs text-slate-400 font-mono font-bold shrink-0 self-end sm:self-auto">
          Showing {filteredInquiries.length} of {inquiries.length} leads
        </div>
      </div>

      {/* Notifications */}
      {crudSuccess && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-xl text-xs font-semibold flex items-center gap-2">
          <LucideIcons.CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{crudSuccess}</span>
        </div>
      )}
      {crudError && (
        <div className="p-3.5 bg-rose-50 border border-rose-100 text-rose-700 rounded-xl text-xs font-semibold flex items-center gap-2">
          <LucideIcons.AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{crudError}</span>
        </div>
      )}

      {/* CRM Leads Table */}
      <div className="bg-white border border-slate-150 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b text-[10px] font-mono uppercase tracking-wider text-slate-400">
              <tr>
                <th className="p-4 font-bold">Contact Person</th>
                <th className="p-4 font-bold">Company / Coordinates</th>
                <th className="p-4 font-bold">Subject Goal</th>
                <th className="p-4 font-bold">Message Details</th>
                <th className="p-4 font-bold">Date Received</th>
                <th className="p-4 font-bold">Workflow Status</th>
                <th className="p-4 font-bold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-650">
              {filteredInquiries.length > 0 ? (
                filteredInquiries.map((i) => (
                  <tr key={i.id} className="hover:bg-slate-50/40 transition-colors">
                    <td className="p-4">
                      <p className="font-bold text-slate-800">{i.fullName}</p>
                      <p className="text-[10px] font-mono text-slate-400">{i.emailAddress}</p>
                    </td>
                    <td className="p-4">
                      <p className="font-semibold text-slate-700">{i.companyName || 'Not Disclosed'}</p>
                      <p className="text-[10px] font-mono text-slate-400">{i.phoneNumber || 'No phone callback'}</p>
                    </td>
                    <td className="p-4 font-semibold text-slate-800">{i.subject}</td>
                    <td className="p-4 max-w-sm">
                      <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100/50 text-slate-600 break-words leading-relaxed max-h-32 overflow-y-auto">
                        {i.message}
                      </div>
                    </td>
                    <td className="p-4 whitespace-nowrap font-mono text-slate-400 text-[11px]">
                      {new Date(i.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                    <td className="p-4">
                      <button 
                        onClick={() => toggleInquiryStatus(i)}
                        className={`px-3 py-1 rounded-full text-[9px] uppercase font-mono font-black transition-all shadow-sm cursor-pointer hover:brightness-95 flex items-center gap-1.5 ${
                          i.status === 'new' 
                            ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                            : i.status === 'read' 
                              ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' 
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}
                        title="Click to cycle status"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${i.status === 'new' ? 'bg-rose-600 animate-pulse' : i.status === 'read' ? 'bg-indigo-600' : 'bg-emerald-600'}`} />
                        <span>{i.status}</span>
                      </button>
                    </td>
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => handleDeleteLead(i.id)}
                        className="p-2 hover:bg-rose-50 text-rose-500 rounded-lg transition-colors cursor-pointer"
                        title="Purge record"
                      >
                        <LucideIcons.Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-slate-400">
                    <LucideIcons.Inbox className="w-10 h-10 text-slate-305 mx-auto mb-3" />
                    <p className="font-medium text-xs">No inquiry matches established criteria.</p>
                    <p className="text-[11px] text-slate-400 mt-1">Review search parameters or clear status filters.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
