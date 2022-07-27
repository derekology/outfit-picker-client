<template>
  <div align="center" id="nav">
    <table>
      <tr>
        <td class="nav-item">
          <router-link to="/">Picker</router-link>
        </td>
        <td class="nav-item">
          <router-link to="/closet">Closet</router-link>
        </td>
        <td class="nav-item">
          <router-link to="/about">About</router-link>
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
#nav {
  padding: 30px;
  background: #222222;
  border-top: 5px solid #dd3333;
}

.nav-item {
  padding: 0px 10px 0px 10px;
  width: 33%;
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: #8d8d8d;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
}

#nav a:hover {
  color: #ffffff;
  transition-duration: 0.2s;
}

#nav a.router-link-exact-active {
  color: #ffffff;
}
</style>
