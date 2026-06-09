import { renderHook, waitFor, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { useKnowledge } from './useKnowledge';
import { createWrapper } from '../../../tests/queryWrapper';

vi.mock('../../shared/hooks/useTenantId', () => ({ useTenantId: () => 'demo-sdr' }));

const mockSuccess = vi.fn();
const mockError = vi.fn();
vi.mock('../../shared/hooks/useToast', () => ({ useToast: () => ({ success: mockSuccess, error: mockError }) }));

const { mockDocs } = vi.hoisted(() => ({
  mockDocs: [{ id: '1', name: 'Manual.pdf', status: 'indexed' }],
}));

vi.mock('../../../services/knowledge.service', () => ({
  getKnowledge: vi.fn().mockResolvedValue(mockDocs),
  uploadDocument: vi.fn().mockResolvedValue({ id: '2', name: 'FAQ.pdf', status: 'processing' }),
}));

describe('useKnowledge', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('começa em loading, isUploading false', () => {
    const { result } = renderHook(() => useKnowledge(), { wrapper: createWrapper() });
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isUploading).toBe(false);
  });

  it('retorna documentos da base de conhecimento', async () => {
    const { result } = renderHook(() => useKnowledge(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.data).toHaveLength(1);
    expect(result.current.data?.[0].name).toBe('Manual.pdf');
  });

  it('handleFiles faz upload de cada arquivo e exibe toast.success', async () => {
    const { uploadDocument } = await import('../../../services/knowledge.service');
    const { result } = renderHook(() => useKnowledge(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const file = new File(['content'], 'FAQ.pdf', { type: 'application/pdf' });
    const fileList = { 0: file, length: 1, item: (i: number) => (i === 0 ? file : null) } as unknown as FileList;

    await act(async () => { result.current.handleFiles(fileList); });
    await waitFor(() => expect(mockSuccess).toHaveBeenCalled());
    expect(uploadDocument).toHaveBeenCalledWith('demo-sdr', file);
  });

  it('handleFiles com null não faz nada', async () => {
    const { uploadDocument } = await import('../../../services/knowledge.service');
    const { result } = renderHook(() => useKnowledge(), { wrapper: createWrapper() });
    act(() => { result.current.handleFiles(null); });
    expect(uploadDocument).not.toHaveBeenCalled();
  });
});
