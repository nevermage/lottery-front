<template>
  <header>
    <div class="headerContent">
      <router-link :to="{name: 'feed'}" id="headerLogo">Lottery</router-link>
      <a class="headerLoginButton" onclick="showLoginForm()">Log in</a>
    </div>
  </header>
</template>
