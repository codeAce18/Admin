import { showFailedMessage, showSuccessMessage } from './utils';

const urll = process.env.REACT_APP_API_URL;

const fetchApi = async (endpoint: string, parameters: Object | null, httpMethod: string, token: string | null = null) => {
    const url = urll + endpoint;
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(url, {
            method: httpMethod,
            headers,
            body: httpMethod !== 'GET' ? JSON.stringify(parameters) : undefined,
        });

        const data = await response.json();
        return data;

    } catch (err) {
        console.error('Error:', err);
        return { message: "Failed" };
    }
};

// 1. Authenticate Admin
export const authenticateAdmin = async (email: string, password: string) => {
    const endpoint = '/api/admin/authenticate';
    const parameters = { email, password };
    const httpMethod = 'POST';
    const response = await fetchApi(endpoint, parameters, httpMethod);

    if (response && 'token' in response) {
        // Save token somewhere (e.g., localStorage or state)
        return response.token;
    } else {
        showFailedMessage(response.message);
        return null;
    }
};

// 2. View All Players
export const viewAllPlayers = async (token: string) => {
    const endpoint = '/api/admin/all';
    const httpMethod = 'GET';
    return await fetchApi(endpoint, null, httpMethod, token);
};

// 3. View Top Players
export const viewTopPlayers = async (token: string) => {
    const endpoint = '/api/admin/topplayers';
    const httpMethod = 'GET';
    return await fetchApi(endpoint, null, httpMethod, token);
};

// 4. View Daily Top Players
export const viewDailyTopPlayers = async (token: string) => {
    const endpoint = '/api/admin/dailytopplayers';
    const httpMethod = 'GET';
    return await fetchApi(endpoint, null, httpMethod, token);
};

// 5. View Daily Active Users
export const viewDailyActiveUsers = async (token: string) => {
    const endpoint = '/api/admin/dailyactiveusers';
    const httpMethod = 'GET';
    const result = await fetchApi(endpoint, null, httpMethod, token);
    if (result && Array.isArray(result)) {
        return result;
    } else {
        return [];
    }
};

// 6. Get Stats and Counts
export const getStatsAndCounts = async (token: string) => {
    const endpoint = '/api/admin/stats';
    const httpMethod = 'GET';
    return await fetchApi(endpoint, null, httpMethod, token);
};

// 7. Block Player
export const blockPlayer = async (playerId: string, token: string) => {
    const endpoint = `/api/admin/blockplayer/${playerId}`;
    const httpMethod = 'PUT';
    const response = await fetchApi(endpoint, null, httpMethod, token);
    if (response && 'message' in response) {
        showSuccessMessage(response.message);
    } else {
        showFailedMessage(response.message);
    }
};
export const unblockPlayer = async (playerId: string, token: string) => {
    const endpoint = `/api/admin/unblockplayer/${playerId}`;
    const httpMethod = 'PUT';
    const response = await fetchApi(endpoint, null, httpMethod, token);
    if (response && 'message' in response) {
        showSuccessMessage(response.message);
    } else {
        showFailedMessage(response.message);
    }
};

// 8. Export Players CSV
export const exportPlayersCSV = async (token: string) => {
    const endpoint = '/api/admin/exportplayers';
    const httpMethod = 'GET';
    return await fetchApi(endpoint, null, httpMethod, token);
};

// 9. View Notifications
export const viewNotifications = async (token: string) => {
    const endpoint = '/api/admin/notifications';
    const httpMethod = 'GET';
    return await fetchApi(endpoint, null, httpMethod, token);
};

// 10. Get Session Sum for Week
export const getSessionSumForWeek = async (token: string) => {
    const endpoint = '/api/admin/analytics/session-sum';
    const httpMethod = 'GET';
    const result = await fetchApi(endpoint, null, httpMethod, token);
    if (result && !('message' in result)) {
        return result;
    } else {
        return {};
    }
};

// 11. Get Percentage of Users Per Level
export const getUsersPerLevelPercentage = async (token: string) => {
    const endpoint = '/api/admin/analytics/level-percentage';
    const httpMethod = 'GET';
    const result = await fetchApi(endpoint, null, httpMethod, token);
    if (result && Array.isArray(result)) {
        return result;
    } else {
        return [];
    }
};

// 12. Get Active Players Per Hour
export const getActivePlayersPerHour = async (token: string) => {
    const endpoint = '/api/admin/analytics/active-players';
    const httpMethod = 'GET';
    return await fetchApi(endpoint, null, httpMethod, token);
};

// 13. Add Task
export const addTask = async (name: string, description: string, reward: number, url: string, token: string) => {
    const endpoint = '/api/tasks/add';
    const parameters = { name, description, reward, url };
    const httpMethod = 'POST';
    const response = await fetchApi(endpoint, parameters, httpMethod, token);

    if (response && 'task' in response) {
        showSuccessMessage(response.message);
        return response.task;
    } else {
        showFailedMessage(response.message);
    }
};
export const getAllTasks = async (token: string) => {
    const endpoint = '/api/tasks/all';
    const httpMethod = 'GET';
    return await fetchApi(endpoint, null, httpMethod, token);
};
// 14. Edit Task
export const editTask = async (id: string, name: string, description: string, reward: number, url: string, token: string) => {
    const endpoint = '/api/tasks/edit/' + id;
    const parameters = { name, description, reward, url };
    const httpMethod = 'PUT';
    const response = await fetchApi(endpoint, parameters, httpMethod, token);

    if (response && 'task' in response) {
        showSuccessMessage(response.message);
        return response.task;
    } else {
        showFailedMessage(response.message);
    }
};

// 15. Remove Task
export const removeTask = async (taskId: string, token: string) => {
    const endpoint = `/api/tasks/remove/${taskId}`;
    const httpMethod = 'DELETE';
    const response = await fetchApi(endpoint, null, httpMethod, token);

    if (response && 'message' in response) {
        showSuccessMessage(response.message);
    } else {
        showFailedMessage(response.message);
    }
};

export const getAllLevels = async (token: string) => {
    const endpoint = '/api/admin/level/all';
    const httpMethod = 'GET';
    return await fetchApi(endpoint, null, httpMethod, token);
};
// 16. Add Level
export const addLevel = async (levelDetails: Object, token: string) => {
    const endpoint = '/api/admin/level/add';
    const httpMethod = 'POST';
    const response = await fetchApi(endpoint, levelDetails, httpMethod, token);

    if (response && 'level' in response) {
        showSuccessMessage(response.message);
        return response.level;
    } else {
        if(response && 'errors' in response){
            Object.values(response.errors).map(error =>{
                if(Array.isArray(error)){
                    setTimeout(() =>{
                        showFailedMessage(error[0]);
                    }, 500);
                    
                }
                return null;
            });
        }
        
    }
};

// 17. Edit Level
export const editLevel = async (levelId: string, levelDetails: Object, token: string) => {
    const endpoint = `/api/admin/level/edit/${levelId}`;
    const httpMethod = 'PUT';
    const response = await fetchApi(endpoint, levelDetails, httpMethod, token);

    if (response && 'level' in response) {
        showSuccessMessage(response.message);
        return response.level;
    } else {
        if(response && 'errors' in response){
            Object.values(response.errors).map(error =>{
                if(Array.isArray(error)){
                    setTimeout(() =>{
                        showFailedMessage(error[0]);
                    }, 500);
                    
                }
                return null;
            });
        }
    }
};

// 18. Delete Level
export const deleteLevel = async (levelId: string, token: string) => {
    const endpoint = `/api/admin/level/delete/${levelId}`;
    const httpMethod = 'DELETE';
    const response = await fetchApi(endpoint, null, httpMethod, token);

    if (response && 'message' in response) {
        showSuccessMessage(response.message);
    } else {
        showFailedMessage(response.message);
    }
};

// 19. Upload Image
export const uploadImage = async (imageFile: File, token: string) => {
    const endpoint = '/api/admin/upload/image';
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
        const response = await fetch(urll + endpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Error:', err);
        return { message: "Failed" };
    }
};

// 20. View All Players
export const viewAllTreasurePurchases = async (token: string) => {
    const endpoint = '/api/admin/treasures/purchases';
    const httpMethod = 'GET';
    return await fetchApi(endpoint, null, httpMethod, token);
};