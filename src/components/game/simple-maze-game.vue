<template>
    <exercise-title 
        ref="exercise_title" 
        title="Simple Maze Game [PC version]"
        subtitle="[hint] Use mouse to play, you can only start to draw a line near to the dog."
        class="mb-2"
    />
    
    <div class="mb-5">
        <div class="canvas-container">
            <div style="position: relative; left: 5px; top: -30px;">
                Score: {{ score }}
            </div>
            <div>
                <canvas
                    id="canvas-bg"
                    width="660"
                    height="660"
                />
                <canvas
                    id="canvas-fg"
                    width="660"
                    height="660"
                />
            </div>
        </div>

        <img
            src="https://imgur.com/uClf1OI.png"
            style="position: absolute"
            :style="{
                left: `${player_info.left}px`, 
                top: `${player_info.top}px`,
                width: `${player_info.width}px`,
                height: `${player_info.height}px`,
            }"
            referrerpolicy="no-referrer"
        >

        <audio
            ref="coin_sound"
            referrerpolicy="no-referrer"
        >
            <source
                src="@/assets/sounds/coin.mp3"
                type="audio/mpeg"
            >
        </audio>
    </div>
</template>

<script setup>
    import ExerciseTitle from '@/components/common/exercise-title.vue';
    import { ref, onMounted } from 'vue';

    // flag
    const is_drawing = ref(false);
    const first_move = ref(true);

    // const data
    const wall_size = 20;
    const maze_layout = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
        [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 2, 1, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];
    const maze_height = maze_layout.length;
    const maze_width = maze_layout[0].length;

    // variable
    const exercise_title = ref();
    const coin_sound = ref();
    const score = ref(0);
    const path = ref([]);
    const current_position = ref({ x: 23, y: 32 });
    const title_height = ref(0);
    const player_info = ref({ left: 0, top: 0, width: 30, height: 30 });
    const context_bg = ref();
    const context_fg = ref();
    
    const draw_maze = (context) => {
        for (let i = 0; i < maze_height; i++) {
            for (let j = 0; j < maze_width; j++) {
                if (maze_layout[i][j] === 1) {
                    context.fillStyle = 'green';
                    context.fillRect(j * wall_size, i * wall_size, wall_size, wall_size);
                } else if (maze_layout[i][j] === 2) {
                    context.fillStyle = 'gold';
                    const coin_x = j * wall_size + wall_size / 2;
                    const coin_y = i * wall_size + wall_size / 2;
                    context.beginPath();
                    context.arc(coin_x, coin_y, wall_size / 4, 0, Math.PI * 2);
                    context.fill();
                } else if (maze_layout[i][j] === 3) {
                    context.fillStyle = 'red';
                    const coin_x = j * wall_size + wall_size / 2;
                    const coin_y = i * wall_size + wall_size / 2;
                    context.beginPath();
                    context.arc(coin_x, coin_y, wall_size / 3, 0, Math.PI * 2);
                    context.fill();
                }
            }
        }
    };

    const draw_path = (context) => {
        context.strokeStyle = 'black';
        context.lineWidth = 3;
        context.beginPath();

        if (path.value.length > 0) {
            context.moveTo(path.value[0].x, path.value[0].y);

            for (let i = 1; i < path.value.length; i++) {
                context.lineTo(path.value[i].x, path.value[i].y);
            }
        }

        context.stroke();
        draw_maze(context_bg.value);
    };

    const is_path_valid = (start, end) => {
        if (path.value.length === 0) start = end;
        const grid_x1 = Math.floor(start.x / wall_size);
        const grid_y1 = Math.floor(start.y / wall_size);
        const grid_x2 = Math.floor(end.x / wall_size);
        const grid_y2 = Math.floor(end.y / wall_size);

        const diff_x1 = Math.abs(current_position.value.x - grid_x1);
        const diff_y1 = Math.abs(current_position.value.y - grid_y1);

        if (first_move.value && (diff_x1 + diff_y1 > 1)) {
            return false;
        }

        if (
            grid_x1 < 0 || grid_x1 >= maze_width ||
            grid_y1 < 0 || grid_y1 >= maze_height ||
            grid_x2 < 0 || grid_x2 >= maze_width ||
            grid_y2 < 0 || grid_y2 >= maze_height ||
            maze_layout[grid_y1][grid_x1] === 1 ||
            maze_layout[grid_y2][grid_x2] === 1
        ) {
            return false;
        }

        // 檢查路徑上每個點
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        const steps = Math.max(Math.abs(dx), Math.abs(dy));
        const step_x = dx / steps;
        const step_y = dy / steps;

        for (let i = 1; i <= steps; i++) {
            const x = start.x + i * step_x;
            const y = start.y + i * step_y;
            const grid_x = Math.floor(x / wall_size);
            const grid_y = Math.floor(y / wall_size);

            if (maze_layout[grid_y][grid_x] === 1) {
                return false;
            }
        }

        return true;
    };

    const start_image_animation = () => {
        const speed = 1;
        let current_index = 0;

        const timer = setInterval(() => {
            if (current_index < path.value.length) {
                const point = path.value[current_index];
                player_info.value.left = point.x - (player_info.value.width / 2);
                player_info.value.top = point.y - (player_info.value.height / 2) + title_height.value + 8;
                current_index += speed;
                check_coin_collision();
            } else {
                clearInterval(timer);
            }
        }, 1000 / 60);
    };

    const check_coin_collision = () => {
        const player_x = parseFloat(player_info.value.left) + player_info.value.width / 2;
        const player_y = parseFloat(player_info.value.top) + player_info.value.height / 2;

        // 檢查玩家是否與金幣碰撞
        for (let i = 0; i < maze_height; i++) {
            for (let j = 0; j < maze_width; j++) {
                if (maze_layout[i][j] === 2) {
                    const coin_x = j * wall_size + wall_size / 2;
                    const coin_y = i * wall_size + wall_size / 2 + title_height.value + 8;

                    // 碰撞檢測
                    const player_left = player_x - player_info.value.width / 2;
                    const player_right = player_x + player_info.value.width / 2;
                    const player_top = player_y - player_info.value.height / 2;
                    const player_bottom = player_y + player_info.value.height / 2;

                    const circle_radius = wall_size / 4;

                    const closest_x = Math.max(player_left, Math.min(coin_x, player_right));
                    const closest_y = Math.max(player_top, Math.min(coin_y, player_bottom));

                    const distance = Math.sqrt((closest_x - coin_x) ** 2 + (closest_y - coin_y) ** 2);

                    if (distance < circle_radius) {
                        // 玩家與金幣碰撞
                        score.value += 20;

                        // 播放音效
                        coin_sound.value.currentTime = 0;
                        coin_sound.value.play();

                        // 移除金幣
                        maze_layout[i][j] = 0;
                        context_bg.value.clearRect(j * wall_size, i * wall_size, wall_size, wall_size);
                    }
                }
            }
        }
    };

    const get_mouse_pos = (canvas, event) => {
        const rect = canvas.getBoundingClientRect();
        const scale_x = canvas.width / rect.width;
        const scale_y = canvas.height / rect.height;
        const x = (event.clientX - rect.left) * scale_x;
        const y = (event.clientY - rect.top) * scale_y;
        return { x, y };
    };

    onMounted(() => {
        // 設置初始位置
        title_height.value = exercise_title.value.$el.getBoundingClientRect().height;
        player_info.value.left = wall_size * current_position.value.x - 5;
        player_info.value.top = wall_size * current_position.value.y + title_height.value + 8; // 8 = mb-2

        const canvas_bg = document.querySelector('#canvas-bg');
        context_bg.value = canvas_bg.getContext('2d');
        const canvas_fg = document.querySelector('#canvas-fg');
        context_fg.value = canvas_fg.getContext('2d');
        canvas_fg.addEventListener('mousedown', () => {
            is_drawing.value = true;
            path.value = [];
            context_fg.value.clearRect(0, 0, canvas_fg.width, canvas_fg.height);
            draw_maze(context_bg.value);
        });

        canvas_fg.addEventListener('mousemove', (event) => {
            if (!is_drawing.value) return;
            const { x, y } = get_mouse_pos(canvas_fg, event);
            if (is_path_valid(path.value[path.value.length - 1], { x, y })) {
                first_move.value = false;
                path.value.push({ x, y });
                requestAnimationFrame(() => draw_path(context_fg.value));
            }
        });

        canvas_fg.addEventListener('mouseup', () => {
            first_move.value = true;
            is_drawing.value = false;
            start_image_animation();
            let temp_position = path.value.slice(-1)[0];
            let x = Math.floor(temp_position?.x / wall_size);
            let y = Math.floor(temp_position?.y / wall_size);
            if (x && y) {
                current_position.value = { x: x, y: y };
            }
        });

        draw_maze(context_bg.value);
    });
</script>

<style>
    .canvas-container {
        position: relative;
        height: 660px;
    }

    canvas {
        position: absolute;
        top: 0;
        left: 0;
    }
</style>
