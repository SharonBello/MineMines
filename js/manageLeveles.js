'use strict'

function levels(level='easier') {
    switch (level) {
        case 'easier':
            init(N * 2)
            break
        case 'easy':
            init(N * 3)
            break
        case 'medium':
            init(N * 4)
            break
        case 'hard':
            init(N * 5)
            break
        case 'crazy':
            init(N * 6)
            break
    }
}