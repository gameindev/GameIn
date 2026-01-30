import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { socialIntegrationService } from '../services/social-integration.service';

// Async thunks
export const fetchAllStatuses = createAsyncThunk(
    'socialIntegration/fetchAllStatuses',
    async (_, { rejectWithValue }) => {
        try {
            const data = await socialIntegrationService.getAllStatuses();
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const fetchStatus = createAsyncThunk(
    'socialIntegration/fetchStatus',
    async (platform, { rejectWithValue }) => {
        try {
            const data = await socialIntegrationService.getStatus(platform);
            return { platform, data };
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const connectPlatform = createAsyncThunk(
    'socialIntegration/connectPlatform',
    async (platform, { rejectWithValue }) => {
        try {
            const url = await socialIntegrationService.getConnectUrl(platform);
            // Open OAuth window
            window.location.href = url;
            return { platform, url };
        } catch (error) {
            const payload = error.response?.data ?? error.message;
            return rejectWithValue(payload);
        }
    }
);

function errorMessage(payload) {
    if (payload == null) return 'Something went wrong';
    if (typeof payload === 'string') return payload;
    return payload?.message ?? payload?.error ?? 'Something went wrong';
}

export const fetchPlatformStats = createAsyncThunk(
    'socialIntegration/fetchPlatformStats',
    async ({ platform, integrationId }, { rejectWithValue }) => {
        try {
            const data = await socialIntegrationService.fetchStats(platform, integrationId);
            return { platform, data };
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const initialState = {
    integrations: {}, // { [platform]: { state, label, summary, integration_id, ... } }
    loading: false,
    error: null,
    connecting: null, // Currently connecting platform
    stats: {}, // { [platform]: stats data }
};

const socialIntegrationSlice = createSlice({
    name: 'socialIntegration',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        setConnecting: (state, action) => {
            state.connecting = action.payload;
        },
        updateIntegration: (state, action) => {
            const { platform, data } = action.payload;
            state.integrations[platform] = data;
        },
    },
    extraReducers: (builder) => {
        // Fetch all statuses
        builder
            .addCase(fetchAllStatuses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllStatuses.fulfilled, (state, action) => {
                state.loading = false;
                // Convert array to object keyed by platform
                const integrations = {};
                action.payload.forEach((item) => {
                    if (item?.platform) {
                        integrations[item.platform] = item;
                    }
                });
                state.integrations = integrations;
            })
            .addCase(fetchAllStatuses.rejected, (state, action) => {
                state.loading = false;
                state.error = errorMessage(action.payload);
            });

        // Fetch single status
        builder
            .addCase(fetchStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStatus.fulfilled, (state, action) => {
                state.loading = false;
                const { platform, data } = action.payload;
                if (platform && data) {
                    state.integrations[platform] = data;
                }
            })
            .addCase(fetchStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = errorMessage(action.payload);
            });

        // Connect platform
        builder
            .addCase(connectPlatform.pending, (state, action) => {
                state.connecting = action.meta.arg;
                state.error = null;
            })
            .addCase(connectPlatform.fulfilled, (state) => {
                state.connecting = null;
            })
            .addCase(connectPlatform.rejected, (state, action) => {
                state.connecting = null;
                state.error = errorMessage(action.payload);
            });

        // Fetch stats
        builder
            .addCase(fetchPlatformStats.fulfilled, (state, action) => {
                const { platform, data } = action.payload;
                state.stats[platform] = data;
            });
    },
});

export const { clearError, setConnecting, updateIntegration } = socialIntegrationSlice.actions;
export default socialIntegrationSlice.reducer;
