// global.test.js
/**
 * @jest-environment jsdom
 */

// Import the functions to be tested
import { menuMobile, transitionSetting, itemsAppearing } from '../js/global.js';

// Helper function to set up the DOM elements for testing
const setupDOM = () => {
    document.body.innerHTML = `
        <header class="header">
            <button class="burger"></button>
            <div class="logo">
                <a href="#"></a>
            </div>
            <nav class="navbar">
                <a href="#">Link 1</a>
                <a href="#">Link 2</a>
            </nav>
            <ul class="menu-list">
                <li>Item 1</li>
                <li>Item 2</li>
            </ul>
        </header>
    `;
};

describe('menuMobile', () => {
    beforeEach(() => {
        setupDOM(); // Set up the DOM before each test
        menuMobile(); // Call the function to be tested
    });

    // Write your test cases here
    test('toggles show-nav class on header when burger button is clicked', () => {
        // Simulate clicking the burger button
        const btn = document.querySelector('.burger');
        btn.click();

        // Assert that the 'show-nav' class is toggled on the header
        const header = document.querySelector('header');
        expect(header.classList.contains('show-nav')).toBe(true);

        // Click the burger button again and assert that the class is toggled off
        btn.click();
        expect(header.classList.contains('show-nav')).toBe(false);
    });

    // Write more test cases as needed
});

// Add more describe blocks for testing other functions if necessary

